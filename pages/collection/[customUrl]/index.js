import Collection from '@src/containers/Collection/Collection'
import { useRouter } from 'next/router'
import React from 'react'

export default function collection() {
    const router = useRouter()
    const customUrl = router.query.customUrl

    return (
        <Collection customUrl={customUrl} />
    )
}