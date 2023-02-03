import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Image from 'next/image';
import { useState } from 'react';

export default function Panel({ isOpen, className, icon, name, children }) {

    const [isOpenPanel, setIsOpenPanel] = useState(isOpen || false)

    const onOpenPanel = () => {
        setIsOpenPanel(!isOpenPanel)
    }

    return (
        <div className={`panel ${className} ${isOpenPanel ? 'active' : ''}`} >
            <div className='panel__header' onClick={onOpenPanel}>
                <div className='panel__header__left'>
                    {icon}
                    <span>{name}</span>
                </div>
                <div className='panel__header__right'>
                    {!isOpenPanel && <ExpandMoreIcon />}
                    {isOpenPanel && <ExpandLessIcon />}
                </div>
            </div>
            {isOpenPanel && <div className='panel__body'>
                {children}
            </div>}
        </div>
    )
}
