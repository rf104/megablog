import React, { useEffect, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { imageUrl, savePost } from '../../services/posts'
import { supabaseEnabled } from '../../conf/conf'
import { Button, Input, RTE, Select } from '../index'
import { AlertIcon, ImageIcon } from '../Icons'

// Trim stray hyphens; titles with no Latin letters (e.g. Bengali) get a short unique slug instead.
function finalizeSlug(slug) {
    const clean = slug.replace(/-+/g, '-').replace(/^-|-$/g, '')
    return clean || `post-${Date.now().toString(36)}`
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // matches the bucket limit in supabase/schema.sql

function ImagePicker({ registration, previewUrl, error, isEditing, optional }) {
    return (
        <div>
            <span className="mb-1.5 inline-block text-sm font-medium text-stone-700 dark:text-stone-300">Cover image</span>
            <label
                className={`group relative flex aspect-[16/10] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors
                    focus-within:ring-4 focus-within:ring-brand-500/15
                    ${error
                        ? 'border-red-300 bg-red-50/50 dark:border-red-500/40 dark:bg-red-500/5'
                        : 'border-stone-200 bg-stone-50 hover:border-brand-400 hover:bg-brand-50/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/50'}`}
            >
                {previewUrl ? (
                    <>
                        <img src={previewUrl} alt="Cover preview" className="absolute inset-0 size-full object-cover" />
                        <span className="absolute inset-0 flex items-center justify-center bg-stone-950/50 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Change image
                        </span>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 px-4 text-center">
                        <span className="flex size-10 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm dark:bg-white/10 dark:text-brand-300">
                            <ImageIcon />
                        </span>
                        <span className="text-sm font-medium text-stone-700 dark:text-stone-200">Click to upload</span>
                        <span className="text-xs text-stone-500">PNG, JPG, GIF or WebP · up to 5 MB</span>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    className="sr-only"
                    {...registration}
                />
            </label>
            {error ? (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
            ) : (isEditing || optional) && (
                <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">
                    {isEditing ? 'Leave as-is to keep the current cover.' : "Optional. We'll pick a cover if you skip it."}
                </p>
            )}
        </div>
    )
}

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
            authorName: post?.authorName === 'Anonymous' ? '' : post?.authorName || '',
        }
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [submitError, setSubmitError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(post ? imageUrl(post.featuredImage) : '');
    // Signed-out writers (and edits of their earlier posts) save to this browser instead of Supabase.
    const isLocal = post ? post.source === 'local' : !userData;

    const imageFiles = watch('image');

    // Live preview of a newly picked cover image.
    useEffect(() => {
        const file = imageFiles?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [imageFiles]);

    const submit = async (data) => {
        setSubmitError('');
        try {
            const saved = await savePost(post, {
                title: data.title,
                slug: finalizeSlug(data.slug),
                content: data.content,
                status: data.status,
                authorName: data.authorName,
                image: data.image?.[0],
            }, userData);
            navigate(`/post/${saved.slug}`);
        } catch (err) {
            setSubmitError(err.message);
        }
    }

    // Runs on every keystroke, so it keeps a trailing hyphen while the user is still typing.
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .normalize('NFKD').replace(/[̀-ͯ]/g, '') // é → e
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+/, '')
        }
        return ''
    }, [])

    useEffect(() => {
        // Auto-generate the slug from the title for new posts only, so published URLs don't change by accident.
        if (post) return;
        const subscription = watch((val, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(val.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue, post])

    return (
        <form onSubmit={handleSubmit(submit)} className="grid gap-6 lg:grid-cols-3" noValidate>
            <div className="card space-y-5 p-5 sm:p-6 lg:col-span-2">
                {isLocal && !post && (
                    <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-100">
                        You're writing anonymously. This post is saved in this browser only, so other readers won't see it.
                        {supabaseEnabled && (
                            <> <Link to="/login" className="font-medium underline underline-offset-2">Sign in</Link> to publish to everyone.</>
                        )}
                    </div>
                )}
                <Input
                    label="Title"
                    placeholder="Give your story a great title"
                    className="h-12 text-lg font-medium"
                    error={errors.title?.message}
                    {...register("title", { required: 'A title is required' })}
                />
                <Input
                    label="Slug"
                    placeholder="your-post-url"
                    hint={`Your post will live at /post/${watch('slug') || 'your-post-url'}${post ? ' (changing it breaks existing links)' : ''}`}
                    error={errors.slug?.message}
                    {...register("slug")}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {isLocal && (
                    <Input
                        label="Your name (optional)"
                        placeholder="Anonymous"
                        maxLength={60}
                        hint="Shown on the post. Leave blank to stay anonymous."
                        {...register("authorName")}
                    />
                )}
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            <aside className="lg:col-span-1">
                <div className="card space-y-5 p-5 sm:p-6 lg:sticky lg:top-24">
                    <ImagePicker
                        registration={register("image", {
                            validate: {
                                required: (files) => !!post || isLocal || files?.length > 0 || 'Please add a cover image',
                                size: (files) => !files?.[0] || files[0].size <= MAX_IMAGE_BYTES || 'Images must be 5 MB or smaller',
                            },
                        })}
                        previewUrl={previewUrl}
                        error={errors.image?.message}
                        isEditing={!!post}
                        optional={isLocal}
                    />
                    <Select
                        options={["active", "inactive"]}
                        label="Visibility"
                        hint="Inactive posts are hidden from the home page."
                        {...register("status", { required: true })}
                    />

                    {submitError && (
                        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                            <AlertIcon className="mt-0.5 size-4 shrink-0" />
                            <span>{submitError}</span>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 border-t border-stone-200 pt-5 dark:border-white/10">
                        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                            {isSubmitting ? (post ? 'Saving' : 'Publishing') : (post ? 'Save changes' : 'Publish post')}
                        </Button>
                        <Button variant="ghost" className="w-full" onClick={() => navigate(-1)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </aside>
        </form>
    )
}

export default PostForm
