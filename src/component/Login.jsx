import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from './index'
import AuthShell from './AuthShell'
import authService from '../supabase/auth'

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }))
          navigate('/')
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to keep reading and writing."
      error={error}
      footer={
        <>
          New to MegaBlog?{' '}
          <Link to="/signup" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(login)} className="space-y-5" noValidate>
        <Input
          label="Email"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            validate: {
              matchPattern: (value) => emailPattern.test(value) || 'Enter a valid email address',
            },
          })}
        />
        <Input
          label="Password"
          placeholder="Your password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          {isSubmitting ? 'Signing in' : 'Sign in'}
        </Button>
      </form>
    </AuthShell>
  )
}

export default Login
