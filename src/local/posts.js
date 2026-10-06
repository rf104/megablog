import seedPosts from './seedPosts.js'

// Anonymous posts live only in this browser's localStorage. Built-in posts ship with the app and are read-only.
const STORAGE_KEY = 'megablog:posts';

function load() {
    try {
        const posts = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(posts) ? posts : [];
    } catch {
        return [];
    }
}

function save(posts) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
        throw new Error(
            "Couldn't save in this browser. Its storage may be full (try a smaller cover image or delete an older post), or private browsing may be blocking it."
        );
    }
}

function newId() {
    return `local-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export class LocalPostService {
    // Same post shape as the Supabase service, plus `source` and `authorName`.
    getPosts({ status = 'active' } = {}) {
        const posts = [...load(), ...seedPosts];
        return status ? posts.filter((p) => p.status === status) : posts;
    }

    getPost(slug) {
        return this.getPosts({ status: null }).find((p) => p.slug === slug) ?? null;
    }

    createPost({ title, slug, content, featuredImage, status, authorName }) {
        const now = new Date().toISOString();
        const post = {
            id: newId(),
            slug,
            title,
            content,
            featuredImage,
            status,
            authorName: authorName?.trim() || 'Anonymous',
            userId: null,
            source: 'local',
            createdAt: now,
            updatedAt: now,
        };
        save([post, ...load()]);
        return post;
    }

    updatePost(id, { title, slug, content, featuredImage, status, authorName }) {
        const posts = load();
        const index = posts.findIndex((p) => p.id === id);
        if (index === -1) throw new Error('This post no longer exists in this browser.');

        const updated = {
            ...posts[index],
            title,
            slug,
            content,
            status,
            authorName: authorName?.trim() || 'Anonymous',
            updatedAt: new Date().toISOString(),
        };
        if (featuredImage) updated.featuredImage = featuredImage;

        posts[index] = updated;
        save(posts);
        return updated;
    }

    deletePost(id) {
        save(load().filter((p) => p.id !== id));
        return true;
    }
}

const localPostService = new LocalPostService();

export default localPostService;
