import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'

export default function Trending({ data }) {

    const tabs = ['Trending']

    const TrendingItem = ({ number, item }) => {
        return (
            <Link href={{ pathname: '/collection/[customUrl]', query: { customUrl: item.customUrl } }}>
                <div className='trendingItem'>
                    <div className='trendingItem__left'>
                        <div className='num'>{number}</div>
                        <div className='img'>
                            {/* <Image alt="" src={item?.collectionImg} fill /> */}
                            <img src={item?.collectionImg} />
                        </div>
                        <div className='name'>
                            {item.name}
                        </div>
                    </div>
                    <div className='trendingItem__right'>
                        {<div className='floor'>{item.floor ? item.floor : '--'} ETH </div>}
                        <div className='volume'>{item.volume.toFixed(3)} ETH</div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div className='home__trending'>
            <div className='home__trending__title'>
                <div className='leftGroup'>
                    {tabs.map((item, i) => {
                        return <div key={i} className='leftGroup__tab'>{item}</div>
                    })}
                </div>
            </div>
            {data && <div className='home__trending__body'>
                <div className='body__left'>
                    <div className='body__left__header'>
                        <div className='left'>
                            Collection
                        </div>
                        <div className='right'>
                            <div className='right__floor'>Floor price</div>
                            <div className='right__volume'>Volume</div>
                        </div>
                    </div>
                    {data[0]?.map((item, i) => {
                        return <TrendingItem key={i} number={i + 1} item={item} />
                    })}
                </div>
                <div className='body__right'>
                    <div className='body__right__header'>
                        <div className='left'>
                            Collection
                        </div>
                        <div className='right'>
                            <div className='right__floor'>Floor price</div>
                            <div className='right__volume'>Volume</div>
                        </div>
                    </div>
                    {data[1]?.map((item, i) => {
                        return <TrendingItem key={i} number={i + 6} item={item} />
                    })}
                </div>
            </div>}
        </div>
    )
}
