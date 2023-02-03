import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useState } from 'react';

export default function NavList({ title, children }) {
    const [isOpenNav, setIsOpenNav] = useState(false)

    const onToggleNav = () => {
        setIsOpenNav(!isOpenNav)
    }

    return (
        <div className='navList'>
            <button className='navList__header' onClick={onToggleNav}>
                <div className='navList__header__left'>{title}</div>
                <div className='navList__header__right'>
                    {!isOpenNav && <ExpandMoreIcon />}
                    {isOpenNav && <ExpandLessIcon />}
                </div>
            </button>
            <div className='navList__body'>
                {isOpenNav && children}
            </div>
        </div >
    )
}
