import React, { useEffect, useState } from 'react'
import { toogleSidebar } from '@src/store/info/infoSlice';
import { reset, selectAccount, selectIsAuth } from '@src/store/user/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import LogoIcon from "@img/main/logo.svg"
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import WalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonIcon from '@mui/icons-material/Person';
import GridOnIcon from '@mui/icons-material/GridOn';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import MyLink from '@components/Link/CheckLink';
import PositionedMenu from '@components/Menu/PositionedMenu';
import Image from 'next/image';

export default function Navbar() {
    const [isOpenAccountBar, setIsOpenAccoutBar] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)
    const isOpenSidebar = useSelector(state => state.defaultVariable.isOpenSidebar)
    const account = useSelector(selectAccount);
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(reset())
        signOut({ redirect: false })
    }

    const barItems = [
        {
            title: "Profile",
            icon: <PersonIcon />,
            href: account.wallet ? { pathname: '/account/[wallet]', query: { wallet: account.wallet } } : '/login',
        },
        {
            title: "My collections",
            icon: <GridOnIcon />,
            href: '/collections'
        },
        {
            title: "Settings",
            icon: <SettingsIcon />,
            href: "/account/settings"
        },
        isAuth && {
            title: "Log out",
            icon: <LogoutIcon />,
            onClick: onLogout
        }
    ]

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onToggleSidebar = () => {
        dispatch(toogleSidebar())
        if (!isOpenSidebar) {
            window.removeEventListener('scroll', handleScroll);
            setScrollPosition(100);
        } else {
            window.addEventListener('scroll', handleScroll);
            setScrollPosition(window.pageYOffset);
        }
    }

    const onToggleAccountBar = () => setIsOpenAccoutBar(!isOpenAccountBar)

    return (
        <div className={`navbar ${scrollPosition > 20 ? 'scroll-mode' : ''}`}>
            <Link href={'/'}>
                <button className='navbar__left'>
                    <LogoIcon />
                    <div className='navbar__left__name'>
                        555NFT
                    </div>
                </button>
            </Link>
            <div className='navbar__center'>
                <Link className='item' href='/explore-collections'>
                    Explore
                </Link>
                <MyLink className='item' href='/create' errorMessage={'Please create first collection'} handleClick={!account.isEmptyCollections}>
                    Create
                </MyLink>
            </div>
            <div className='navbar__right'>
                <PositionedMenu className='navbar__right__menu' items={barItems}>
                    {!isAuth && <AccountCircleIcon />}
                    {isAuth && account.profileImg && <Image alt='logo' width={30} height={30} src={account.profileImg} unoptimized />}
                </PositionedMenu>
                <button className='item' onClick={onToggleSidebar}>
                    <WalletIcon />
                </button>
            </div>

        </div >
    )
}
