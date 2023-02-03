import Loader from '@components/Common/Loader'
import { getHome } from '@src/API/main'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Category from './components/Category'
import Explore from './components/Explore'
import Trending from './components/Trending'

export default function Home() {

    const [isLoading, setIsLoading] = useState({})
    const [mainData, setMainData] = useState(true)

    useEffect(() => {
        getHome()
            .then(resp => setMainData(resp))
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) return <Loader />

    return (
        <div className='home'>
            <Explore data={mainData.swiper} />
            <Trending data={mainData.trending} />
            <Category />
        </div>
    )
}
