import React from 'react'

function Logo({ showText = true, className = '' }) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
                <rect width="32" height="32" rx="9" className="fill-brand-800 dark:fill-brand-400" />
                <path
                    d="M8 23V9l8 8 8-8v14"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-brand-200 dark:stroke-brand-950"
                />
            </svg>
            {showText && (
                <span className="font-display text-xl font-semibold tracking-tight text-stone-900 dark:text-white">
                    Mega<span className="text-brand-600 dark:text-brand-400">Blog</span>
                </span>
            )}
        </span>
    );
}

export default Logo
