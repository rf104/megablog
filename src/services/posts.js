import remote from '../supabase/posts.js'
import local from '../local/posts.js'
import { supabaseEnabled } from '../conf/conf.js'
import { compressImage } from '../utils/image.js'

// One entry point for every post, wherever it lives:
//   'seed'   built into the app (read-only)
//   'local'  written anonymously, saved in this browser's localStorage
//   'remote' written while signed in, saved in Supabase

const newestFirst = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

/**
 * Built-in and browser posts always load. Supabase posts join in when it's configured;
 * if Supabase fails, the other posts still show and the failure comes back as `remoteError`.
 */
export async function getPosts({ status = 'active' } = {}) {
    const posts = local.getPosts({ status });
    let remoteError = '';
    if (supabaseEnabled) {
        try {
            posts.push(...await remote.getPosts({ status }));
        } catch (err) {
            remoteError = err.message;
        }
    }
    return { posts: posts.sort(newestFirst), remoteError };
}

// Returns null when no post has this slug (or it isn't visible to this user).
export async function getPost(slug) {
    return local.getPost(slug) ?? (supabaseEnabled ? remote.getPost(slug) : null);
}

// Browser posts belong to whoever uses this browser; Supabase posts to their author.
export function canEdit(post, user) {
    if (!post) return false;
    if (post.source === 'local') return true;
    if (post.source === 'remote') return !!user && post.userId === user.id;
    return false;
}

async function assertSlugFree(slug, exceptId) {
    let existing = local.getPost(slug);
    // Best effort: an unreachable Supabase shouldn't stop someone saving to their browser.
    if (!existing && supabaseEnabled) existing = await remote.getPost(slug).catch(() => null);
    if (existing && existing.id !== exceptId) {
        throw new Error('That slug is already taken. Try a different one.');
    }
}

/**
 * Creates `fields` as a new post, or updates `post` with them. New posts go to Supabase
 * when someone is signed in, otherwise to this browser. `image` is an optional new cover file.
 */
export async function savePost(post, { image, ...fields }, user) {
    const source = post?.source ?? (user ? 'remote' : 'local');
    await assertSlugFree(fields.slug, post?.id);

    if (source === 'local') {
        const featuredImage = image ? await compressImage(image) : null;
        return post
            ? local.updatePost(post.id, { ...fields, featuredImage })
            : local.createPost({ ...fields, featuredImage });
    }

    let uploadedPath = null;
    try {
        if (image) uploadedPath = await remote.uploadFile(image, user.id);
        const data = { ...fields, featuredImage: uploadedPath };
        const saved = post
            ? await remote.updatePost(post.id, data)
            : await remote.createPost({ ...data, userId: user.id });

        // Replace the old cover only once the post has been saved with the new one.
        if (post && uploadedPath) remote.deleteFile(post.featuredImage);
        return saved;
    } catch (err) {
        // Don't leave an orphaned image behind if saving the post failed.
        if (uploadedPath) remote.deleteFile(uploadedPath);
        throw err;
    }
}

export async function deletePost(post) {
    if (post.source === 'local') return local.deletePost(post.id);
    await remote.deletePost(post.id);
    remote.deleteFile(post.featuredImage);
    return true;
}

// Browser and built-in covers are already URLs (data: or bundled assets); Supabase covers are storage paths.
export function imageUrl(path) {
    if (!path) return '';
    if (/^(data:|blob:|https?:|\/)/.test(path)) return path;
    return supabaseEnabled ? remote.getImageUrl(path) : '';
}
