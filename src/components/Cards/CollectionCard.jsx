import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function CollectionCard({ item }) {
    const router = useRouter()

    return (
        <Link href={{ pathname: '/collection/[customUrl]', query: { customUrl: item.customUrl } }} >
            <div className='collection-card'>
                <div className='collection-card__img'>
                    <img src={item.collectionBackImg} />
                    {/* <Image alt="" fill src={item.collectionBackImg} /> */}
                </div>
                <div className='collection-card__body'>
                    <div className='img'>
                        <img src={item.collectionImg} />
                        {/* <Image alt="" fill src={item.collectionImg} /> */}
                    </div>
                    <div className='name'>{item.name}</div>
                </div>
            </div>
        </Link>
    )
}
