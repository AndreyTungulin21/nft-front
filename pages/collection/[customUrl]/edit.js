import EditCollection from '@src/containers/Edit/EditCollection'
import { useRouter } from 'next/router'
import React from 'react'

export default function edit() {
    const router = useRouter()
    const customUrl = router.query.customUrl

    return (
        <EditCollection customUrl={customUrl} />
    )
}

edit.auth = true
