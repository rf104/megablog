import React, { useId, useState } from 'react'
import { EyeIcon, EyeOffIcon } from './Icons'
import { borderClass, fieldClass } from './fieldStyles'

export function FieldLabel({ htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="mb-1.5 inline-block text-sm font-medium text-stone-700 dark:text-stone-300">
            {children}
        </label>
    );
}

export function FieldMessage({ id, error, hint }) {
    if (error) return <p id={id} className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>;
    if (hint) return <p id={id} className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">{hint}</p>;
    return null;
}

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    error,
    hint,
    ...props
}, ref) {
    const id = useId();
    const msgId = `${id}-msg`;
    const [reveal, setReveal] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className="w-full">
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            <div className="relative">
                <input
                    className={`${fieldClass} ${borderClass(error)} ${isPassword ? 'pr-11' : ''} ${className}`}
                    type={isPassword && reveal ? 'text' : type}
                    ref={ref}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error || hint ? msgId : undefined}
                    {...props}
                    id={id}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setReveal((r) => !r)}
                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                        aria-label={reveal ? 'Hide password' : 'Show password'}
                    >
                        {reveal ? <EyeOffIcon className="size-[18px]" /> : <EyeIcon className="size-[18px]" />}
                    </button>
                )}
            </div>
            <FieldMessage id={msgId} error={error} hint={hint} />
        </div>
    );
});

export default Input
