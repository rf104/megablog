import { createClient } from '@supabase/supabase-js'
import conf, { missingConfig } from '../conf/conf.js'

// createClient throws on a missing URL, so only build the client when configured.
// Without it the app runs in browser-only mode (see `supabaseEnabled`), so callers must check that first.
const supabase = missingConfig.length === 0
    ? createClient(conf.supabaseUrl, conf.supabaseKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true, // picks up the session from email-confirmation links
        },
    })
    : null

export default supabase
