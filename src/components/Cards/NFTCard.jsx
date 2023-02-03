import Image from 'next/image'
import React from 'react'

import ETHIcon from '@img/main/ETH.svg';
import Link from 'next/link';


export default function NFTCard({ key, item }) {
    return (
        // 
        <Link href={{ pathname: '/assets/[id]', query: { id: item.id } }}>
            <div className='nft-card'>
                <div className='nft-card__img'>
                    {/* <Image alt="" fill src={item.nftPreviewImage || ''} /> */}
                    <img src={item.nftPreviewImage || ''} />
                </div>
                <div className='nft-card__title'>{item.name}</div>
                <div className='nft-card__body'>
                    {item.price && <div className='nft-card__body__left'>
                        <div className='title'>Price</div>
                        <div className='price'>
                            <ETHIcon />
                            <span>{item.price}</span>
                        </div>
                    </div>}
                    <div className='nft-card__body__right'></div>
                </div>
            </div>
        </Link >
    )
}
