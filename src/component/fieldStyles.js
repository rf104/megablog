// Shared input/select styling.
export const fieldClass = `w-full h-11 rounded-xl border bg-white px-3.5 text-[15px] text-stone-900 placeholder:text-stone-400
    transition-colors duration-150 outline-none
    focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15
    dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500`;

export const borderClass = (error) =>
    error
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500/60'
        : 'border-stone-200 dark:border-white/10';
