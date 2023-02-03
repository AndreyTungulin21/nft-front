import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuth } from '@src/store//user/userSlice';

export default function LinkAuth({ href, children, isAuth = false }) {
    const isAuthProfile = useSelector(selectIsAuth);

    const checkAutn = () => {
        if (isAuthProfile) return href
        return '/login'
    }

    return (
        <Link legacyBehavior href={isAuth ? checkAutn() : href}>{children}</Link>
    )
}
