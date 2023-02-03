import React, { useState } from 'react'

import AccountIcon from '@mui/icons-material/AccountCircle';

export default function SettingsBar() {

    const [activeMenu, setActiveMenu] = useState('Profile')

    const menu = [
        {
            icon: <AccountIcon />,
            name: 'Profile'
        }
    ]

    const MenuItem = ({ item }) => {
        return (
            <li className={`item ${activeMenu === item.name ? 'active' : ''}`}>
                <div className='item__icon'>{item.icon}</div>
                <div className='item__name'>{item.name}</div>
            </li>
        )
    }

    return (
        <div className='settingsBar'>
            <ul className='settingsBar__menu'>
                <div className='settingsBar__menu__header'>
                    Settings
                </div>
                <div className='settingsBar__menu__body'>
                    {menu.map((item, i) => {
                        return <MenuItem key={i} item={item} />
                    })}
                </div>

            </ul>
        </div>
    )
}
