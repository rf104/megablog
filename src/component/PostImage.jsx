import React, { useState } from 'react'
import { imageUrl } from '../services/posts'
import { fallbackImageFor } from '../utils/post'

// Post cover (Supabase Storage, browser-saved or built-in), falling back to a bundled cover if it can't be loaded.
function PostImage({ path, postId, alt, className = '', ...props }) {
    const fallback = fallbackImageFor(postId || path || alt)
    const [src, setSrc] = useState(() => imageUrl(path) || fallback)
    const [loaded, setLoaded] = useState(false)

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => src !== fallback && setSrc(fallback)}
            className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
            {...props}
        />
    )
}

export default PostImage
