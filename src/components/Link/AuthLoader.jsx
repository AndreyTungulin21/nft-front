import Loader from '@components/Common/Loader';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function AuthLoader({ children }) {
    const { status } = useSession({ required: true })

    if (status === "loading") {
        return <Loader />
    }

    return children
}
