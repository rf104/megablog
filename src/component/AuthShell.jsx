import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { AlertIcon } from './Icons'
import readingIllustration from '../photos/42.png'

// Shared split-screen layout for sign in / sign up.
function AuthShell({ title, subtitle, error, children, footer }) {
    return (
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
            <aside className="relative hidden overflow-hidden rounded-3xl bg-brand-50 p-10 lg:flex lg:flex-col dark:bg-brand-400/[0.06]">
                <div className="absolute -right-24 -top-24 size-72 rounded-full bg-brand-200/50 blur-3xl dark:bg-brand-500/10" aria-hidden="true" />
                <p className="relative font-display text-3xl font-semibold leading-snug text-brand-950 dark:text-brand-100">
                    “A reader lives a thousand lives before he dies.”
                </p>
                <p className="relative mt-3 text-sm text-brand-800/70 dark:text-brand-200/60">— George R.R. Martin</p>
                <img
                    src={readingIllustration}
                    alt=""
                    className="relative mt-auto w-full max-w-md self-center drop-shadow-sm"
                />
            </aside>

            <section className="flex items-center justify-center">
                <div className="w-full max-w-md animate-fade-up">
                    <Link to="/" className="mb-8 inline-block lg:hidden" aria-label="MegaBlog home">
                        <Logo />
                    </Link>
                    <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
                    {subtitle && <p className="mt-2 text-stone-500 dark:text-stone-400">{subtitle}</p>}

                    {error && (
                        <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                            <AlertIcon className="mt-0.5 size-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="mt-8">{children}</div>

                    {footer && <p className="mt-8 text-center text-sm text-stone-500 dark:text-stone-400">{footer}</p>}
                </div>
            </section>
        </div>
    )
}

export default AuthShell
