import { useCallback, useEffect, useState } from 'react'

function getInitialTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // Storage may be unavailable (private mode); the theme still applies for this visit.
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    }, []);

    return { theme, toggleTheme };
}
