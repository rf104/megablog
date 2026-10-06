import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from './index'
import AuthShell from './AuthShell'
import authService from '../supabase/auth'
import { MailIcon } from './Icons'

const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/

function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [error, setError] = useState('')
    const [pendingEmail, setPendingEmail] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const create = async (data) => {
        setError('');
        try {
            const { user, needsConfirmation } = await authService.createAccount(data);
            if (needsConfirmation) {
                setPendingEmail(data.email)
            } else if (user) {
                dispatch(authLogin({ userData: user }))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    if (pendingEmail) {
        return (
            <AuthShell
                title="Check your inbox"
                subtitle="One more step and you're in."
                footer={
                    <>
                        Already confirmed?{' '}
                        <Link to="/login" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
                            Sign in
                        </Link>
                    </>
                }
            >
                <div className="card flex items-start gap-4 p-5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">
                        <MailIcon />
                    </div>
                    <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                        We sent a confirmation link to <span className="font-medium text-stone-900 dark:text-white">{pendingEmail}</span>.
                        Open it to activate your account. You'll be signed in automatically.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => setPendingEmail('')}
                    className="mt-4 text-sm text-stone-500 hover:text-stone-800 hover:underline dark:hover:text-stone-200"
                >
                    Used the wrong email? Go back
                </button>
            </AuthShell>
        )
    }

    return (
        <AuthShell
            title="Create your account"
            subtitle="Join a community of curious readers and writers."
            error={error}
            footer={
                <>
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-brand-700 hover:underline dark:text-brand-300">
                        Sign in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit(create)} className="space-y-5" noValidate>
                <Input
                    label="Full name"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register('name', { required: 'Name is required' })}
                />
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
                    placeholder="At least 8 characters"
                    type="password"
                    autoComplete="new-password"
                    hint={errors.password ? undefined : 'Use 8 or more characters.'}
                    error={errors.password?.message}
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    })}
                />
                <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                    {isSubmitting ? 'Creating account' : 'Create account'}
                </Button>
            </form>
        </AuthShell>
    )
}

export default Signup
