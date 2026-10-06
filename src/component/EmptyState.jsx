import React from 'react'

function EmptyState({ icon, title, description, action }) {
    return (
        <div className="card flex flex-col items-center px-6 py-16 text-center">
            {icon && (
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-semibold">{title}</h3>
            {description && <p className="mt-2 max-w-sm text-stone-500 dark:text-stone-400">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

export default EmptyState
