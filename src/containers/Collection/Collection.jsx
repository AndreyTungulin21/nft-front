import React from 'react'
import Image from 'next/image'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Search from '@components/Search/Search';

import TabsContent from '@components/Tabs/TabsContent';
import BarFilter from '@components/BarFilter/BarFilter';
import Loader from '@components/Common/Loader'

import { useState } from 'react';
import Items from './components/Items';
import Activity from './components/Activity';
import Link from 'next/link';
import { useEffect } from 'react';
import { getCollectionInfo } from '@src/API/collection';
import moment from 'moment';
import SeeMore from '@components/Common/SeeMore';

export default function Collection({ customUrl }) {
    const tabs = [
        { id: 0, name: 'Items' },
        { id: 1, name: 'Activity' },
    ]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [isOpenbar, setIsOpenBar] = useState(false)
    const [collection, setCollections] = useState({})
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (customUrl) {
            getDataApi()
        }
    }, [customUrl])

    const getDataApi = async () => {
        let collectionInfo = await getCollectionInfo({ customUrl })
            .then(resp => resp.data)
            .finally(() => setIsLoading(false))

        setCollections({ ...collectionInfo })
    }

    const onClickTab = (item) => setActiveTab(item)

    if (isLoading) return <Loader />

    return (
        <div className="collection-profile">
            <div className='collection-profile__background'>
                <img src={collection.collectionBackImg} />
            </div>
            <div className='collection-profile__user'>
                <div className='collection-profile__user__logo'>
                    <img width={168} height={168} src={collection.collectionImg} />
                </div>
                <div className="collection-profile__user__info">
                    <div className='info__left'>
                        <h2>{collection.name}</h2>
                    </div>
                </div>
                <div className='collection-profile__user__by'>
                    By <Link href={{ pathname: '/account/[wallet]', query: { wallet: collection.user?.wallet } }} >{collection.user?.username}</Link>
                </div>
                <div className='collection-profile__user__subInfo'>
                    Items <b>{collection.countNFTs}</b> Created <b>{moment(collection.created).format('YYYY')}</b> Creator fee <b>{collection.creatorFee}%</b>
                </div>
                <SeeMore text={collection.description} />
                <TabsContent tabs={tabs} onClickTab={onClickTab} activeTab={activeTab} />
            </div>
            <div className='collection-profile__search'>
                <Search onChangeBar={(bar) => setIsOpenBar(bar)} />
            </div>
            <div className='collection-profile__body'>
                <div className='collection-profile__body__left'>
                    {isOpenbar && <BarFilter />}
                </div>
                {activeTab.name === 'Items' && <Items collection={collection} />}
                {/* {activeTab.name === 'Items' && <div className='emptyCollection'>No items to display</div>} */}
                {activeTab.name === 'Activity' && <Activity collection={collection} />}
            </div>
        </div>
    )
}