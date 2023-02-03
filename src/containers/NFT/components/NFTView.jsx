import React from 'react'
import ETHIcon from '@img/main/ETH.svg';
import Image from 'next/image';

export default function NFTView({ nft }) {
    return (
        <div className='nftView'>
            <div className='nftView__source'>
                <header className='nftView__source__header'>
                    <ETHIcon />
                </header>
                <div className='nftView__source__image'>
                    {/* <Image alt="" key={'test'} fill /> */}
                    <img src={nft.nftThumbnailImage} />
                </div>
            </div>
        </div>
    )
}
