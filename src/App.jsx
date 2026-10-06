import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import authService from './supabase/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer, Logo } from './component/index'
import Spinner from './component/Spinner'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Supabase reports the current session immediately, then every sign-in, sign-out and
  // token refresh — including ones from other tabs and email-confirmation links.
  useEffect(() => {
    return authService.onAuthChange((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout());
      }
      setLoading(false);
    })
  }, [dispatch]);

  // Start each page at the top.
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
        <Logo />
        <Spinner className="size-6 text-brand-600 dark:text-brand-400" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
