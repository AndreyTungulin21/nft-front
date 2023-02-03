import React from 'react'
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import NFTCard from '@components/Cards/NFTCard'


export default function MoreFromCollection({ nfts }) {
    return (
        <Swiper
            removeclippedsubviews={false}
            slidesPerView={5}
            spaceBetween={9}
            slidesPerGroup={1}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                type: "progressbar",
            }}
            className="swiper__collection"
        >
            {nfts?.map((item, key) => {
                return (
                    <SwiperSlide key={key}>
                        <NFTCard item={item} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
