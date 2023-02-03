import React, { useState } from 'react'

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TabsContent from '@components/Tabs/TabsContent';
import Search from '@components/Search/Search';
import moment from "moment";


import BarFilter from '@components/BarFilter/BarFilter';
import Collected from './components/Collected';
import Created from './components/Created';
import PositionedMenu from '@components/Menu/PositionedMenu';
import { sliceText } from '@src/helpers/Common';
import { useEffect } from 'react';
import { getUserInfo } from '@src/API/user';
import { useSelector } from 'react-redux';

import ETHIcon from '@img/main/ETH.svg';
import Link from 'next/link';
import Loader from '@components/Common/Loader';
import SettingsIcon from '@mui/icons-material/Settings';
import { selectAccount } from '@src/store/user/userSlice';
import SeeMore from '@components/Common/SeeMore';
import Image from 'next/image';

export default function AccountProfile({ wallet }) {

    const [activeTab, setActiveTab] = useState({ id: 0, name: 'Collected' })
    const [isOpenbar, setIsOpenBar] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [account, setAccount] = useState({})
    const profile = useSelector(selectAccount);

    const [links, setLinks] = useState([])

    const tabs = [
        { id: 0, name: 'Collected' },
        { id: 1, name: 'Created' },
    ]


    const settingsBar = [
        {
            title: "Settings",
            icon: <SettingsIcon />,
            href: "/account/settings"
        }
    ]

    const AccountBtns = () => {
        return (
            <PositionedMenu className='accountBtn' items={settingsBar}>
                <MoreHorizIcon />
            </PositionedMenu>
        )
    }

    useEffect(() => {
        if (wallet)
            getApiData()
    }, [wallet])


    const getApiData = async () => {
        const userInfo = await getUserInfo({ wallet })
        setIsLoading(false)
        setLinks([
            { img: <TwitterIcon />, href: userInfo.links?.twitter, name: 'twitter', link: 'https://twitter.com/' + userInfo.links?.twitter },
            { img: <InstagramIcon />, href: userInfo.links?.instagram, name: 'instagram', link: 'https://www.instagram.com/' + userInfo.links?.instagram },
        ])

        setAccount(userInfo)
    }

    const onClickTab = (item) => setActiveTab(item)

    const AccountLinks = ({ item }) => {
        return item.href &&
            <Link target="_blank" href={item.link} className='accountBtn'>
                {item.img}
            </Link>
    }

    if (isLoading) return <Loader />

    return (
        <div className='account-profile'>
            <div className='account-profile__background'>
                {account.profileBackImg && <Image alt='logo_back' fill src={account.profileBackImg} />}
            </div>
            <div className='account-profile__user'>
                <div className='account-profile__user__logo'>
                    {account.profileImg && <Image alt='logo' width={168} height={168} src={account.profileImg} />}
                </div>
                <div className="account-profile__user__info">
                    <div className='info__left'>
                        <h2>{account.username}</h2>
                    </div>
                    <div className='info__right'>
                        <div className='info__right__more'>
                            {links.map((item, i) => { return <AccountLinks key={i} item={item} /> })}
                        </div>
                        {wallet === profile.wallet && <div className='info__right__settings'>
                            <AccountBtns />
                        </div>}
                    </div>
                </div>
                <div className='account-profile__user__ethDate'>
                    <ETHIcon /> {account.wallet && <div className='address'>{sliceText(account.wallet, 4, '...')}</div>}
                    <div className='date'>Joined {moment(account.created).format('MMMM YYYY')}</div>
                </div>
                <SeeMore text={account.bio} />
                <TabsContent tabs={tabs} onClickTab={onClickTab} activeTab={activeTab} />
            </div>
            <div className='account-profile__search'>
                <Search onChangeBar={(bar) => setIsOpenBar(bar)} />
            </div>
            <div className='account-profile__body'>
                <div className='account-profile__body__left'>
                    {isOpenbar && <BarFilter />}
                </div>
                {activeTab.name === 'Collected' && <Collected account={account} />}
                {activeTab.name === 'Created' && <Created account={account} />}
            </div>
        </div>
    )
}


