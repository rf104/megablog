import React, { useId } from 'react'
import { FieldLabel, FieldMessage } from './Input'
import { borderClass, fieldClass } from './fieldStyles'

function Select({
    options,
    label,
    className = '',
    error,
    hint,
    ...props
}, ref) {
    const id = useId();
    const msgId = `${id}-msg`;

    return (
        <div className="w-full">
            {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
            <div className="relative">
                <select
                    className={`${fieldClass} ${borderClass(error)} appearance-none pr-10 capitalize ${className}`}
                    aria-describedby={error || hint ? msgId : undefined}
                    {...props}
                    id={id}
                    ref={ref}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <svg className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                </svg>
            </div>
            <FieldMessage id={msgId} error={error} hint={hint} />
        </div>
    );
}

export default React.forwardRef(Select)
