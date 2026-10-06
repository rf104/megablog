import React from 'react'
import Logo from '../component/Logo'
import { AlertIcon } from '../component/Icons'

// Shown instead of the app when required environment variables are missing.
function ConfigError({ missing }) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-16">
            <div className="card w-full max-w-xl p-8">
                <Logo />
                <div className="mt-8 flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
                        <AlertIcon />
                    </div>
                    <div>
                        <h1 className="font-sans text-xl font-semibold">Supabase isn't configured yet</h1>
                        <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
                            The app needs these environment variables before it can start:
                        </p>
                    </div>
                </div>
                <ul className="mt-5 space-y-2">
                    {missing.map((name) => (
                        <li key={name}>
                            <code className="rounded-lg bg-stone-100 px-2.5 py-1 text-sm text-stone-800 dark:bg-white/10 dark:text-stone-200">{name}</code>
                        </li>
                    ))}
                </ul>
                <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-stone-600 dark:text-stone-400">
                    <li>Copy <code className="font-medium">.envSample</code> to <code className="font-medium">.env</code> in the project root.</li>
                    <li>Fill in the values from your Supabase project's <span className="font-medium">Connect</span> panel (or Project Settings → API).</li>
                    <li>Restart <code className="font-medium">npm run dev</code>. Vite only reads <code className="font-medium">.env</code> on start-up.</li>
                </ol>
            </div>
        </div>
    )
}

export default ConfigError
