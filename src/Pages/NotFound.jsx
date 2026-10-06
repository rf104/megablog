import React from 'react'
import { Button, Container } from '../component'
import { ArrowLeftIcon } from '../component/Icons'

function NotFound() {
    return (
        <Container size="narrow" className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
            <p className="font-display text-8xl font-semibold text-brand-200 dark:text-brand-400/30">404</p>
            <h1 className="mt-4 text-3xl font-semibold">This page wandered off</h1>
            <p className="mt-3 max-w-md text-stone-500 dark:text-stone-400">
                The page you're looking for doesn't exist or may have been moved.
            </p>
            <Button to="/" className="mt-8">
                <ArrowLeftIcon className="size-4" /> Back to home
            </Button>
        </Container>
    )
}

export default NotFound
