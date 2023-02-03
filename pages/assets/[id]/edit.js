import EditNFT from '@src/containers/Edit/EditNFT'
import { useRouter } from 'next/router'
import React from 'react'

export default function edit() {
    const router = useRouter()
    const id = router.query.id

    return <EditNFT id={id} />
}

edit.auth = true
