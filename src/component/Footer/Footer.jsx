import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Logo'
import Container from '../Container/Container'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../Icons'

const linkClass = 'text-sm text-stone-600 transition-colors hover:text-brand-700 dark:text-stone-400 dark:hover:text-brand-300'

function Footer() {
    const authStatus = useSelector((state) => state.auth.status)

    const columns = [
        {
            title: 'Explore',
            links: [
                { name: 'Home', to: '/' },
                authStatus ? { name: 'All posts', to: '/all-posts' } : { name: 'Sign in', to: '/login' },
                authStatus ? { name: 'Write a post', to: '/add-post' } : { name: 'Create account', to: '/signup' },
            ],
        },
        {
            title: 'Company',
            links: [
                { name: 'About', to: '/' },
                { name: 'Contact', to: '/' },
                { name: 'Careers', to: '/' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Terms', to: '/' },
                { name: 'Privacy', to: '/' },
                { name: 'Licensing', to: '/' },
            ],
        },
    ]

    const socials = [
        { name: 'GitHub', href: 'https://github.com', Icon: GithubIcon },
        { name: 'X', href: 'https://x.com', Icon: TwitterIcon },
        { name: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
    ]

    return (
        <footer className="mt-24 border-t border-stone-200/80 bg-white/50 dark:border-white/10 dark:bg-white/[0.02]">
            <Container>
                <div className="grid gap-10 py-14 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Logo />
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                            A home for thoughtful writing. Read stories that resonate, and share the ones only you can tell.
                        </p>
                        <div className="mt-6 flex gap-2">
                            {socials.map(({ name, href, ...social }) => {
                                const Icon = social.Icon
                                return (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={name}
                                    className="flex size-9 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-stone-400 dark:hover:border-brand-400/40 dark:hover:text-brand-300"
                                >
                                    <Icon className="size-4" />
                                </a>
                            )
                            })}
                        </div>
                    </div>
                    {columns.map((col) => (
                        <div key={col.title} className="md:col-span-2 md:col-start-auto">
                            <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                {col.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.to} className={linkClass}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2 border-t border-stone-200/80 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-stone-500">
                    <p>&copy; {new Date().getFullYear()} MegaBlog by rf104. All rights reserved.</p>
                    <p>Built with React, Tailwind &amp; Supabase.</p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
