import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../supabase/auth'
import { logout } from '../../store/authSlice'
import Button from '../Button'
import { LogoutIcon } from '../Icons'

function LogoutBtn({ block = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const logoutHandler = () => {
        setLoading(true);
        authService.logout().finally(() => {
            dispatch(logout());
            navigate('/');
        });
    }

    if (block) {
        return (
            <Button variant="secondary" onClick={logoutHandler} loading={loading}>
                {!loading && <LogoutIcon className="size-4" />} Sign out
            </Button>
        );
    }

    return (
        <button
            type="button"
            onClick={logoutHandler}
            disabled={loading}
            className="flex size-10 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:text-stone-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            aria-label="Sign out"
            title="Sign out"
        >
            <LogoutIcon />
        </button>
    );
}

export default LogoutBtn
