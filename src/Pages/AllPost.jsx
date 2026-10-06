import React, { useEffect, useMemo, useState } from 'react'
import { Button, Container, PostCard } from '../component/index'
import { PostCardSkeleton } from '../component/PostCard'
import EmptyState from '../component/EmptyState'
import { AlertIcon, PenIcon, SearchIcon } from '../component/Icons'
import postService from '../supabase/posts'
import { stripHtml } from '../utils/post'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        let ignore = false
        // status: null → every post this user may see (published posts plus their own drafts).
        postService.getPosts({ status: null })
            .then((data) => { if (!ignore) setPosts(data) })
            .catch((err) => { if (!ignore) setError(err.message) })
            .finally(() => { if (!ignore) setLoading(false) })
        return () => { ignore = true }
    }, [])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return posts
        return posts.filter((p) =>
            p.title?.toLowerCase().includes(q) || stripHtml(p.content).toLowerCase().includes(q)
        )
    }, [posts, query])

    return (
        <div className="py-12">
            <Container>
                <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold sm:text-5xl">All posts</h1>
                        <p className="mt-2 text-stone-500 dark:text-stone-400">
                            {loading ? 'Loading stories…' : `${posts.length} ${posts.length === 1 ? 'story' : 'stories'} to explore`}
                        </p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-stone-400" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search posts…"
                            aria-label="Search posts"
                            className="h-11 w-full rounded-full border border-stone-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-white/10 dark:bg-white/5"
                        />
                    </div>
                </header>

                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)}
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
                        title="Nothing here yet"
                        description="There are no posts to show. Why not write the first one?"
                        action={<Button to="/add-post"><PenIcon className="size-4" /> Write a post</Button>}
                    />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        icon={<SearchIcon className="size-6" />}
                        title="No matches"
                        description={`We couldn't find any posts matching “${query}”.`}
                        action={<Button variant="secondary" onClick={() => setQuery('')}>Clear search</Button>}
                    />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((ps, i) => (
                            <div key={ps.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
                                <PostCard {...ps} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPost
