import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { canEdit, getPost } from '../services/posts'
import { Container, PostForm } from '../component'
import { PageLoader } from '../component/Spinner'
import NotFound from './NotFound'

function EditPost() {
    // undefined = loading, null = not found
    const [post, setPost] = useState(undefined)
    const { slug } = useParams();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        let ignore = false
        getPost(slug)
            .then((data) => { if (!ignore) setPost(data) })
            .catch(() => { if (!ignore) setPost(null) })
        return () => { ignore = true }
    }, [slug])

    if (post === undefined) return <PageLoader label="Loading post" />
    // Browser posts can be edited from this browser; Supabase posts only by their author
    // (the database enforces that too, via row-level security). Built-in posts are read-only.
    if (!canEdit(post, userData)) return <NotFound />

    return (
        <div className="py-10">
            <Container>
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold sm:text-4xl">Edit post</h1>
                    <p className="mt-2 truncate text-stone-500 dark:text-stone-400">{post.title}</p>
                </header>
                <PostForm post={post} />
            </Container>
        </div>
    )
}

export default EditPost
