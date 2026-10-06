import React from 'react'
import { AlertIcon } from './Icons'

// Supabase failed, but built-in and browser posts still loaded.
function CloudNotice({ message }) {
    return (
        <div role="status" className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
            <AlertIcon className="mt-0.5 size-4 shrink-0" />
            <span>Couldn't load posts from the cloud ({message}). Showing built-in and browser posts only.</span>
        </div>
    )
}

export default CloudNotice
