import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useSelector, useDispatch } from 'react-redux'
import { selectAccount } from '@src/store/user/userSlice';

import LogoIcon from "@img/main/logo.svg"
import Link from 'next/link';
import { categoryItems } from '@src/helpers/variables';


export default function Footer() {
    const account = useSelector(selectAccount);

    const links = [
        { img: <TwitterIcon />, name: "twitter" },
        { img: <InstagramIcon />, name: "instagram" },
        { img: <RedditIcon />, name: "reddit" },
        { img: <YouTubeIcon />, name: "youtube" },
    ]

    const profileLinks = [
        { title: 'Profile', href: { pathname: '/account/[wallet]', query: { wallet: account?.wallet || ' ' } }, isAuth: true },
        { title: 'My collections', href: '/collections', isAuth: true },
        { title: 'Settings', href: '/account/settings', isAuth: true },
    ]

    const ContactBtn = ({ item }) => {
        return <div className='contact-btn'>
            {item.img}
        </div>
    }

    return (
        <div className='footer-main'>
            <div className='footer-main__container'>
                <div className='footer-main__contacts'>
                    <div className='contacts__left'></div>
                    <div className='contacts__right'>
                        <h3 className='title'>
                            Join the community
                        </h3>
                        <div className='contacts__right__btns'>
                            {links.map((item, i) => {
                                return <ContactBtn key={i} item={item} />
                            })}
                        </div>
                    </div>
                </div>

                <div className='footer-main__navigation'>
                    <div className='navigation__left'>
                        <LogoIcon />
                        <div className='navigation__left__name'>
                            555NFT
                        </div>
                        <div className='navigation__left__info'>
                            The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.
                        </div>
                    </div>
                    <div className='navigation__right'>
                        <div className='navigation__right__list'>
                            <h3>Marketplace</h3>
                            <ul>
                                {categoryItems.map((item, i) => {
                                    return (
                                        <Link key={i} href={{ pathname: '/explore-collections', query: { name: item.name } }}>
                                            <li>{item.name}</li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='navigation__right__list'>
                            <h3>My Account</h3>
                            <ul>
                                {profileLinks.map((item, i) => {
                                    return (
                                        <Link key={i} href={item.href}>
                                            <li>{item.title}</li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
