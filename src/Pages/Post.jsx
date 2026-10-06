import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { canEdit, deletePost as removePost, getPost } from "../services/posts";
import NotFound from "./NotFound";
import { Button, Container } from "../component/index";
import PostImage from "../component/PostImage";
import ConfirmDialog from "../component/ConfirmDialog";
import { StatusBadge } from "../component/PostCard";
import { ArrowLeftIcon, ClockIcon, PenIcon, TrashIcon } from "../component/Icons";
import { formatDate, readingTime } from "../utils/post";

function PostSkeleton() {
    return (
        <Container size="narrow" className="py-12">
            <span className="sr-only" role="status">Loading post…</span>
            <div className="skeleton h-4 w-24" />
            <div className="skeleton mt-8 h-12 w-full" />
            <div className="skeleton mt-3 h-12 w-2/3" />
            <div className="skeleton mt-6 h-4 w-48" />
            <div className="skeleton mt-10 aspect-[16/9] w-full rounded-2xl" />
            <div className="mt-10 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-4 w-full" />)}
            </div>
        </Container>
    );
}

export default function Post() {
    // undefined = loading, null = not found (or not visible to this user)
    const [post, setPost] = useState(undefined);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = canEdit(post, userData);
    // Browser posts have a chosen name; Supabase posts are labelled "By you" for their author.
    const author = post?.source === 'remote' ? (isAuthor ? 'you' : '') : post?.authorName;

    useEffect(() => {
        let ignore = false;
        setPost(undefined);
        getPost(slug)
            .then((data) => { if (!ignore) setPost(data); })
            .catch(() => { if (!ignore) setPost(null); });
        return () => { ignore = true; };
    }, [slug]);

    const deletePost = async () => {
        setDeleting(true);
        setDeleteError('');
        try {
            await removePost(post);
            navigate("/all-posts");
        } catch (err) {
            setDeleteError(err.message);
            setDeleting(false);
        }
    };

    if (post === undefined) return <PostSkeleton />;
    if (post === null) return <NotFound />;

    return (
        <article className="py-10 sm:py-14">
            <Container size="narrow">
                <div className="flex items-center justify-between gap-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="-ml-3">
                        <ArrowLeftIcon className="size-4" /> Back
                    </Button>
                    {isAuthor && (
                        <div className="flex gap-2">
                            <Button to={`/edit-post/${post.slug}`} variant="secondary" size="sm">
                                <PenIcon className="size-4" /> Edit
                            </Button>
                            <Button variant="danger-outline" size="sm" onClick={() => setConfirmOpen(true)}>
                                <TrashIcon className="size-4" /> Delete
                            </Button>
                        </div>
                    )}
                </div>

                <header className="mt-8 animate-fade-up">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={post.status} />
                        {post.source === 'local' && (
                            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:bg-white/10 dark:text-stone-300" title="Only visible in this browser">
                                Saved in this browser
                            </span>
                        )}
                    </div>
                    <h1 className="mt-3 text-4xl font-semibold leading-[1.1] sm:text-5xl">{post.title}</h1>
                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
                        {author && <span className="font-medium text-stone-700 dark:text-stone-300">By {author}</span>}
                        {author && <span aria-hidden="true">·</span>}
                        {post.createdAt && <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>}
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                            <ClockIcon className="size-4" /> {readingTime(post.content)} min read
                        </span>
                    </div>
                </header>
            </Container>

            <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
                <figure>
                    <div className="overflow-hidden rounded-2xl bg-stone-100 shadow-sm dark:bg-white/5">
                        <PostImage
                            path={post.featuredImage}
                            postId={post.id}
                            alt={post.title}
                            className="aspect-[16/9] w-full object-cover object-center"
                        />
                    </div>
                    {post.coverCredit && (
                        <figcaption className="mt-2 text-right text-xs text-stone-500 dark:text-stone-400">
                            Photo: {post.coverCredit} / Unsplash
                        </figcaption>
                    )}
                </figure>
            </div>

            <Container size="narrow">
                <div className="prose prose-lg prose-stone mt-12 max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand-700 prose-a:underline-offset-2 prose-img:rounded-xl dark:prose-a:text-brand-300">
                    {parse(post.content || "")}
                </div>

                <div className="mt-16 flex items-center justify-between border-t border-stone-200 pt-8 dark:border-white/10">
                    <Link to="/all-posts" className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300">
                        ← More stories
                    </Link>
                </div>
            </Container>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete this post?"
                description={deleteError || `“${post.title}”${post.source === 'local' ? ' will be removed from this browser' : ' and its cover image will be permanently removed'}. This can't be undone.`}
                confirmLabel="Delete post"
                loading={deleting}
                onConfirm={deletePost}
                onCancel={() => { setConfirmOpen(false); setDeleteError(''); }}
            />
        </article>
    );
}
