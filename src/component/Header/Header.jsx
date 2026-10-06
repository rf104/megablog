import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Logo, LogoutBtn, Button } from '../index'
import { CloseIcon, MenuIcon, MoonIcon, PenIcon, SunIcon } from '../Icons'
import useTheme from '../../hooks/useTheme'
import { supabaseEnabled } from '../../conf/conf'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex size-10 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function Avatar({ name = '' }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  return (
    <span
      className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800 ring-2 ring-white dark:bg-brand-400/20 dark:text-brand-200 dark:ring-ink"
      title={name}
    >
      {initials}
    </span>
  )
}

const linkClass = ({ isActive }) =>
  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'text-stone-900 bg-stone-100 dark:text-white dark:bg-white/10'
      : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
  }`

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: true },
  ]

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled || open
          ? 'border-stone-200/80 bg-paper/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink/80'
          : 'border-transparent bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center gap-6" aria-label="Main">
          <Link to="/" className="rounded-lg" aria-label="MegaBlog home">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.filter((i) => i.active).map((item) => (
              <li key={item.name}>
                <NavLink to={item.slug} end className={linkClass}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {authStatus ? (
              <div className="hidden items-center gap-2 md:flex">
                <Button to="/add-post" size="sm" className="mr-1">
                  <PenIcon className="size-4" /> Write
                </Button>
                <Avatar name={userData?.name} />
                <LogoutBtn />
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                {supabaseEnabled && <Button to="/login" variant="ghost" size="sm">Sign in</Button>}
                <Button to="/add-post" size="sm">
                  <PenIcon className="size-4" /> Write
                </Button>
              </div>
            )}
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full text-stone-700 hover:bg-stone-100 md:hidden dark:text-stone-200 dark:hover:bg-white/10"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {open && (
          <div id="mobile-menu" className="animate-fade-up pb-5 md:hidden">
            <ul className="flex flex-col gap-1">
              {navItems.filter((i) => i.active).map((item) => (
                <li key={item.name}>
                  <NavLink to={item.slug} end className={({ isActive }) => `block ${linkClass({ isActive })}`}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 border-t border-stone-200 pt-4 dark:border-white/10">
              {authStatus ? (
                <>
                  <div className="mb-2 flex items-center gap-3 px-1">
                    <Avatar name={userData?.name} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-stone-900 dark:text-white">{userData?.name}</p>
                      <p className="truncate text-xs text-stone-500">{userData?.email}</p>
                    </div>
                  </div>
                  <Button to="/add-post"><PenIcon className="size-4" /> Write a post</Button>
                  <LogoutBtn block />
                </>
              ) : (
                <>
                  <Button to="/add-post"><PenIcon className="size-4" /> Write a post</Button>
                  {supabaseEnabled && <Button to="/login" variant="secondary">Sign in</Button>}
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
