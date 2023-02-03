import Footer from '@src/containers/Footer/Footer'
import NFTPage from '@src/containers/NFT/NFTPage'
import { useRouter } from 'next/router'
import React from 'react'

export default function nft() {
    const router = useRouter()
    const id = router.query.id

    return (
        <>
            <NFTPage id={id} />
            <Footer />
        </>
    )
}