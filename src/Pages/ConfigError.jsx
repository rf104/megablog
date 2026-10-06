import React from 'react'
import Button from '../component/Button'
import { AlertIcon, PenIcon } from '../component/Icons'

// Shown on the sign in / sign up pages when Supabase isn't configured. The rest of the app still works.
function ConfigError({ missing }) {
    return (
        <div className="flex items-center justify-center px-4 py-16">
            <div className="card w-full max-w-xl p-8">
                <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
                        <AlertIcon />
                    </div>
                    <div>
                        <h1 className="font-sans text-xl font-semibold">Accounts aren't set up yet</h1>
                        <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
                            Signing in needs Supabase. You can still read and write anonymously; your posts are saved in this browser.
                        </p>
                    </div>
                </div>
                <Button to="/add-post" className="mt-6"><PenIcon className="size-4" /> Write anonymously</Button>

                <div className="mt-8 border-t border-stone-200 pt-6 dark:border-white/10">
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200">To turn on accounts, set these environment variables:</p>
                    <ul className="mt-3 space-y-2">
                        {missing.map((name) => (
                            <li key={name}>
                                <code className="rounded-lg bg-stone-100 px-2.5 py-1 text-sm text-stone-800 dark:bg-white/10 dark:text-stone-200">{name}</code>
                            </li>
                        ))}
                    </ul>
                    <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-stone-600 dark:text-stone-400">
                        <li>Copy <code className="font-medium">.envSample</code> to <code className="font-medium">.env</code> in the project root.</li>
                        <li>Fill in the values from your Supabase project's <span className="font-medium">Connect</span> panel (or Project Settings → API).</li>
                        <li>Restart <code className="font-medium">npm run dev</code>. Vite only reads <code className="font-medium">.env</code> on start-up.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default ConfigError
