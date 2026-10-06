import React from 'react'
import { Link } from 'react-router-dom'
import PostImage from './PostImage'
import { ArrowRightIcon, ClockIcon } from './Icons'
import { excerpt, formatDate, readingTime } from '../utils/post'

export function StatusBadge({ status }) {
  if (!status || status === 'active') return null
  return (
    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium capitalize text-amber-800 dark:bg-amber-400/15 dark:text-amber-300">
      {status === 'inactive' ? 'Draft' : status}
    </span>
  )
}

function PostMeta({ createdAt, content }) {
  return (
    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
      {createdAt && <time dateTime={createdAt}>{formatDate(createdAt)}</time>}
      {createdAt && <span aria-hidden="true">·</span>}
      <span className="inline-flex items-center gap-1">
        <ClockIcon className="size-3.5" /> {readingTime(content)} min read
      </span>
    </div>
  )
}

function PostCard({ id, slug, title, featuredImage, content = '', status, createdAt, featured = false }) {
  if (featured) {
    return (
      <Link
        to={`/post/${slug}`}
        className="group card grid overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-900/5 md:grid-cols-5"
      >
        {/* On wide screens the photo fills its half of the card at any height, cropped from the centre. */}
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 md:col-span-3 md:aspect-auto md:min-h-96 dark:bg-white/5">
          <PostImage
            path={featuredImage}
            postId={id}
            alt={title}
            className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-4 p-6 sm:p-8 md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-800 dark:bg-brand-400/15 dark:text-brand-300">
              Featured
            </span>
            <StatusBadge status={status} />
          </div>
          <h2 className="text-2xl font-semibold leading-tight transition-colors group-hover:text-brand-700 sm:text-3xl dark:group-hover:text-brand-300">
            {title}
          </h2>
          <p className="line-clamp-3 text-stone-600 dark:text-stone-400">{excerpt(content, 220)}</p>
          <PostMeta createdAt={createdAt} content={content} />
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
            Read story <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/post/${slug}`}
      className="group card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-white/5">
        <PostImage
          path={featuredImage}
          postId={id}
          alt={title}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {status && status !== 'active' && (
          <div className="absolute left-3 top-3">
            <StatusBadge status={status} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="line-clamp-2 text-lg font-semibold leading-snug transition-colors group-hover:text-brand-700 dark:group-hover:text-brand-300">
          {title}
        </h2>
        <p className="line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{excerpt(content)}</p>
        <div className="mt-auto pt-2">
          <PostMeta createdAt={createdAt} content={content} />
        </div>
      </div>
    </Link>
  )
}

export function PostCardSkeleton() {
  return (
    <div className="card overflow-hidden" aria-hidden="true">
      <div className="skeleton aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-4/5" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton mt-4 h-3 w-1/3" />
      </div>
    </div>
  )
}

export default PostCard
