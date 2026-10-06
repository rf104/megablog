import React, { useEffect, useRef } from 'react'
import Button from './Button'
import { AlertIcon } from './Icons'

// Accessible confirm modal built on the native <dialog> element (focus trap + Esc for free).
function ConfirmDialog({ open, title, description, confirmLabel = 'Confirm', loading = false, onConfirm, onCancel }) {
    const ref = useRef(null)

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return
        if (open && !dialog.open) dialog.showModal()
        if (!open && dialog.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={ref}
            onCancel={(e) => { e.preventDefault(); if (!loading) onCancel() }}
            onClick={(e) => { if (e.target === ref.current && !loading) onCancel() }}
            className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-stone-200 bg-white p-0 text-stone-800 shadow-2xl backdrop:bg-stone-950/40 backdrop:backdrop-blur-sm dark:border-white/10 dark:bg-stone-900 dark:text-stone-200"
        >
            <div className="p-6">
                <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                        <AlertIcon />
                    </div>
                    <div>
                        <h2 className="font-sans text-lg font-semibold">{title}</h2>
                        {description && <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">{description}</p>}
                    </div>
                </div>
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button variant="secondary" onClick={onCancel} disabled={loading}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
                </div>
            </div>
        </dialog>
    )
}

export default ConfirmDialog
