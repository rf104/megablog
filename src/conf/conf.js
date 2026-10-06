const env = import.meta.env

const conf = {
    supabaseUrl: env.VITE_SUPABASE_URL?.trim() || '',
    // Newer Supabase projects call this the "publishable" key; older ones call it the "anon" key. Either works.
    supabaseKey: (env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || '').trim(),
    supabaseBucket: env.VITE_SUPABASE_BUCKET?.trim() || 'post-images',
    tinyApiKey: env.VITE_TINY_API_KEY?.trim() || '',
}

// Settings the app can't start without, reported on screen instead of crashing to a blank page.
const isPlaceholder = (url) => url.includes('your-project-ref')

export const missingConfig = [
    (!conf.supabaseUrl || isPlaceholder(conf.supabaseUrl)) && 'VITE_SUPABASE_URL',
    !conf.supabaseKey && 'VITE_SUPABASE_PUBLISHABLE_KEY',
].filter(Boolean)

export default conf
