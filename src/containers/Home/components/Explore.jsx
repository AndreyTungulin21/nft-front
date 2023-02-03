import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import Image from 'next/image'

import "swiper/css";
import "swiper/css/navigation";
import Link from 'next/link';

export default function Explore({ data }) {

    return (
        <div className="home__explore">
            <div className="title">
                Explore, collect, and sell NFTs
            </div>
            <div className='swiper'>
                <Swiper
                    removeclippedsubviews={false}
                    slidesPerView={5}
                    spaceBetween={9}
                    slidesPerGroup={1}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        type: "progressbar",
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="swiper__collection"
                >
                    {data?.map((item, key) => {
                        return (
                            <SwiperSlide key={key}>
                                <Link className='swiper__link' href={{ pathname: '/collection/[customUrl]', query: { customUrl: item.customUrl } }} >
                                    {/* <Image alt="" src={item.collectionImg} fill /> */}
                                    <img src={item.collectionImg} />
                                </Link>
                                <div className='swiper-slide__info'>
                                    <div className='info__title'>{item.name}</div>
                                    <div className='info__floor'>Floor: {item.floor ? item.floor : '--'} ETH</div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div >
    )
}
