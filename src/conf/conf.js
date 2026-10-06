const env = import.meta.env

const conf = {
    // supabase-js wants the bare project URL; tolerate a pasted API endpoint such as ".../rest/v1/".
    supabaseUrl: (env.VITE_SUPABASE_URL?.trim() || '').replace(/\/(rest|auth|storage)\/v1\/?$/, '').replace(/\/+$/, ''),
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

// Without Supabase the app still runs: built-in and anonymous (browser-only) posts work, accounts don't.
export const supabaseEnabled = missingConfig.length === 0

export default conf
