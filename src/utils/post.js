import a from '../photos/covers/fallback-1.jpg'
import b from '../photos/covers/fallback-2.jpg'
import c from '../photos/covers/fallback-3.jpg'
import d from '../photos/covers/fallback-4.jpg'
import e from '../photos/covers/fallback-5.jpg'
import f from '../photos/covers/fallback-6.jpg'

// Neutral writing-desk photos for posts without a cover (Unsplash License).
const fallbackImages = [a, b, c, d, e, f];

// Stable fallback cover per post, so cards don't reshuffle on every render.
export function fallbackImageFor(id = '') {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return fallbackImages[hash % fallbackImages.length];
}

export function stripHtml(html = '') {
    if (typeof window === 'undefined') return html.replace(/<[^>]*>/g, ' ');
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

export function excerpt(html, length = 140) {
    const text = stripHtml(html);
    return text.length > length ? text.slice(0, length).trimEnd() + '…' : text;
}

export function readingTime(html) {
    const words = stripHtml(html).split(' ').filter(Boolean).length;
    return Math.max(1, Math.round(words / 225));
}

export function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}
