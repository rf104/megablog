import React from 'react'
import { Container, PostForm } from '../component/index'

function AddPost() {
  return (
    <div className="py-10">
      <Container>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold sm:text-4xl">Write a new post</h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">Share a story, an idea, or something you've learned.</p>
        </header>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost
