import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

const variants = {
    primary:
        'bg-brand-700 text-white shadow-sm shadow-brand-900/20 hover:bg-brand-800 active:bg-brand-900 dark:bg-brand-400 dark:text-brand-950 dark:hover:bg-brand-300',
    secondary:
        'bg-white text-stone-800 border border-stone-200 shadow-sm hover:bg-stone-50 hover:border-stone-300 dark:bg-white/5 dark:text-stone-100 dark:border-white/10 dark:hover:bg-white/10',
    ghost:
        'text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-300 dark:hover:text-white dark:hover:bg-white/10',
    'danger-outline':
        'bg-white text-stone-700 border border-stone-200 shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:bg-white/5 dark:text-stone-200 dark:border-white/10 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-300',
    danger:
        'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-400',
};

const sizes = {
    sm: 'h-9 px-3.5 text-sm gap-1.5',
    md: 'h-11 px-5 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2',
};

function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    to,
    className = '',
    ...props
}) {
    const classes = `inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap
        transition-all duration-200 select-none cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading} {...props}>
            {loading && <Spinner className="size-4" />}
            {children}
        </button>
    );
}

export default Button
