import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import postService from '../supabase/posts'
import { Button, Container, PostCard } from '../component';
import { PostCardSkeleton } from '../component/PostCard';
import EmptyState from '../component/EmptyState';
import Landing from '../component/Landing';
import { AlertIcon, ArrowRightIcon, PenIcon } from '../component/Icons';

function Home() {
    const authStatus = useSelector((state) => state.auth.status)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!authStatus) return
        let ignore = false
        setLoading(true)
        setError('')
        postService.getPosts()
            .then((data) => { if (!ignore) setPosts(data) })
            .catch((err) => { if (!ignore) setError(err.message) })
            .finally(() => { if (!ignore) setLoading(false) })
        return () => { ignore = true }
    }, [authStatus])

    // Visitors only see the landing page; reading requires an account.
    if (!authStatus) return <Landing />

    const [featured, ...rest] = posts

    return (
        <>
            <Landing />
            <section className="py-12">
                <Container>
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-brand-700 dark:text-brand-300">Latest</p>
                            <h2 className="mt-1 text-3xl font-semibold">Fresh from the blog</h2>
                        </div>
                        {posts.length > 0 && (
                            <Button to="/all-posts" variant="ghost" size="sm" className="hidden sm:inline-flex">
                                View all <ArrowRightIcon className="size-4" />
                            </Button>
                        )}
                    </div>

                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)}
                        </div>
                    ) : error ? (
                        <EmptyState
                            icon={<AlertIcon className="size-6" />}
                            title="Couldn't load posts"
                            description={error}
                            action={<Button variant="secondary" onClick={() => window.location.reload()}>Try again</Button>}
                        />
                    ) : posts.length === 0 ? (
                        <EmptyState
                            icon={<PenIcon className="size-6" />}
                            title="No stories yet"
                            description="Be the first to share something. Your words could be the one someone needs today."
                            action={<Button to="/add-post"><PenIcon className="size-4" /> Write the first post</Button>}
                        />
                    ) : (
                        <div className="space-y-6">
                            <div className="animate-fade-up">
                                <PostCard {...featured} featured />
                            </div>
                            {rest.length > 0 && (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {rest.slice(0, 6).map((post, i) => (
                                        <div key={post.id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                                            <PostCard {...post} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </Container>
            </section>
        </>
    )
}

export default Home
