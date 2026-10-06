import React from 'react';
import { useSelector } from 'react-redux';
import readSvg from '../photos/woman-reading-animate.svg';
import pic7 from '../photos/7.jpg'
import Button from './Button';
import Container from './Container/Container';
import { ArrowRightIcon, BookIcon, PenIcon, UsersIcon } from './Icons';

const features = [
  {
    Icon: BookIcon,
    title: 'Read without noise',
    body: 'A clean, distraction-free reading experience with typography built for long-form stories.',
  },
  {
    Icon: PenIcon,
    title: 'Write beautifully',
    body: 'A rich editor with images, lists, links and tables — so your ideas look as good as they sound.',
  },
  {
    Icon: UsersIcon,
    title: 'Find your people',
    body: 'Share your perspective with readers who care about the same things you do.',
  },
];

function Landing() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center" aria-hidden="true">
          <div className="h-[28rem] w-[56rem] rounded-full bg-gradient-to-tr from-brand-200/60 via-brand-100/40 to-amber-100/40 blur-3xl dark:from-brand-500/15 dark:via-brand-400/5 dark:to-transparent" />
        </div>
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-medium text-brand-800 backdrop-blur dark:border-brand-400/20 dark:bg-white/5 dark:text-brand-300">
              <span className="size-1.5 rounded-full bg-brand-500" /> Stories worth your time
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Where ideas{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 italic text-brand-700 dark:text-brand-300">come to life</span>
                <svg className="absolute -bottom-1 left-0 z-0 h-3 w-full text-brand-200 dark:text-brand-500/30" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-stone-600 md:mx-0 dark:text-stone-400">
              Thoughts bloom into articles, experiences become stories, and expertise finds its audience.
              Discover something new with every click.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              {authStatus ? (
                <>
                  <Button to="/add-post" size="lg"><PenIcon className="size-4" /> Start writing</Button>
                  <Button to="/all-posts" size="lg" variant="secondary">Browse posts <ArrowRightIcon className="size-4" /></Button>
                </>
              ) : (
                <>
                  <Button to="/signup" size="lg">Start reading — it's free</Button>
                  <Button to="/login" size="lg" variant="secondary">Sign in</Button>
                </>
              )}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <img src={readSvg} alt="Illustration of a woman reading a book" className="w-full" />
          </div>
        </Container>
      </section>

      {/* Features — shown to visitors who haven't joined yet */}
      {!authStatus && (
        <section className="py-12 md:py-20">
          <Container>
            <div className="grid gap-5 md:grid-cols-3">
              {features.map(({ title, body, ...feature }) => {
                const Icon = feature.Icon
                return (
                <div key={title} className="card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">
                    <Icon />
                  </div>
                  <h3 className="mt-5 font-sans text-base font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{body}</p>
                </div>
              )
              })}
            </div>

            <div className="card mt-16 grid items-center gap-8 overflow-hidden p-8 md:grid-cols-2 md:p-12">
              <img src={pic7} alt="Illustration of a man reading on a stack of books" className="mx-auto w-full max-w-sm" />
              <div>
                <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Ever wonder about…?</h2>
                <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                  Or maybe you're searching for a story that truly resonates? This is where voices are heard.
                  Create a free account and start exploring — what will you read first?
                </p>
                <Button to="/signup" size="lg" className="mt-8">
                  Join MegaBlog <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

export default Landing;
