import { createClient } from '@supabase/supabase-js'
import conf, { missingConfig } from '../conf/conf.js'

// createClient throws on a missing URL, so only build the client when configured.
// main.jsx shows a setup screen instead of the app when `missingConfig` is non-empty.
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
