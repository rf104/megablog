import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import postService from '../supabase/posts'
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
        postService.getPost(slug)
            .then((data) => { if (!ignore) setPost(data) })
            .catch(() => { if (!ignore) setPost(null) })
        return () => { ignore = true }
    }, [slug])

    if (post === undefined) return <PageLoader label="Loading post" />
    // Only the author may edit; the database enforces this too, via row-level security.
    if (post === null || post.userId !== userData?.id) return <NotFound />

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
