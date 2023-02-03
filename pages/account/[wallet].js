import AccountProfile from '@src/containers/Account/AccountProfile'
import { useRouter } from 'next/router'
import React from 'react'

export default function account() {
    const router = useRouter()
    const wallet = router.query.wallet

    return <AccountProfile wallet={wallet} />
}