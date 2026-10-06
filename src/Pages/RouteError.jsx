import React from 'react'
import { useRouteError } from 'react-router-dom'
import Logo from '../component/Logo'
import { AlertIcon } from '../component/Icons'

// Catches render errors anywhere in the app so a crash shows a message, not a blank screen.
function RouteError() {
    const error = useRouteError()
    const message = error?.statusText || error?.message || 'Unknown error'

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-16">
            <div className="card w-full max-w-lg p-8 text-center">
                <div className="flex justify-center"><Logo /></div>
                <div className="mx-auto mt-8 flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                    <AlertIcon />
                </div>
                <h1 className="mt-4 font-sans text-xl font-semibold">Something went wrong</h1>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                    The page hit an unexpected error. Reloading usually fixes it.
                </p>
                {import.meta.env.DEV && (
                    <pre className="mt-5 overflow-x-auto rounded-xl bg-stone-100 p-4 text-left text-xs text-red-700 dark:bg-white/5 dark:text-red-300">{message}</pre>
                )}
                <div className="mt-6 flex justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="inline-flex h-11 items-center rounded-full bg-brand-700 px-5 text-sm font-medium text-white hover:bg-brand-800 dark:bg-brand-400 dark:text-brand-950"
                    >
                        Reload
                    </button>
                    <a
                        href="/"
                        className="inline-flex h-11 items-center rounded-full border border-stone-200 px-5 text-sm font-medium hover:bg-stone-50 dark:border-white/10 dark:hover:bg-white/10"
                    >
                        Go home
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RouteError
