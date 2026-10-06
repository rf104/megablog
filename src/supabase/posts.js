import supabase from './client.js'
import conf from '../conf/conf.js'

const TABLE = 'posts';

// The app's post shape, independent of the database column names.
function toPost(row) {
    if (!row) return null;
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        content: row.content ?? '',
        featuredImage: row.featured_image,
        status: row.status,
        userId: row.user_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

// Turn Postgres errors into messages a writer can act on.
function friendlyError(error) {
    if (error?.code === '23505') return new Error('That slug is already taken. Try a different one.');
    if (error?.code === '42501') return new Error("You don't have permission to do that.");
    return error instanceof Error ? error : new Error(error?.message || 'Something went wrong.');
}

export class PostService {
    async getPosts({ status = 'active' } = {}) {
        let query = supabase.from(TABLE).select('*').order('created_at', { ascending: false });
        if (status) query = query.eq('status', status);

        const { data, error } = await query;
        if (error) throw friendlyError(error);
        return data.map(toPost);
    }

    // Returns null when the post doesn't exist (or isn't visible to this user).
    async getPost(slug) {
        const { data, error } = await supabase.from(TABLE).select('*').eq('slug', slug).maybeSingle();
        if (error) throw friendlyError(error);
        return toPost(data);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        const { data, error } = await supabase
            .from(TABLE)
            .insert({ title, slug, content, featured_image: featuredImage, status, user_id: userId })
            .select()
            .single();
        if (error) throw friendlyError(error);
        return toPost(data);
    }

    async updatePost(id, { title, slug, content, featuredImage, status }) {
        const changes = { title, slug, content, status };
        if (featuredImage) changes.featured_image = featuredImage;

        const { data, error } = await supabase.from(TABLE).update(changes).eq('id', id).select().single();
        if (error) throw friendlyError(error);
        return toPost(data);
    }

    async deletePost(id) {
        const { error } = await supabase.from(TABLE).delete().eq('id', id);
        if (error) throw friendlyError(error);
        return true;
    }

    /// Storage

    // Files live under "<userId>/" so storage policies can restrict each user to their own folder.
    async uploadFile(file, userId) {
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const path = `${userId}/${crypto.randomUUID()}.${ext}`;

        const { error } = await supabase.storage
            .from(conf.supabaseBucket)
            .upload(path, file, { cacheControl: '31536000', contentType: file.type, upsert: false });
        if (error) throw friendlyError(error);
        return path;
    }

    async deleteFile(path) {
        if (!path) return false;
        const { error } = await supabase.storage.from(conf.supabaseBucket).remove([path]);
        if (error) {
            console.error('Supabase :: deleteFile', error);
            return false;
        }
        return true;
    }

    getImageUrl(path) {
        if (!path) return '';
        return supabase.storage.from(conf.supabaseBucket).getPublicUrl(path).data.publicUrl;
    }
}

const postService = new PostService();

export default postService;
