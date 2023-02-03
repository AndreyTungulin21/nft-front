import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import React, { useState } from 'react';

export default function PositionedMenu({ className, items = [], children }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div className={className}>
            <button
                style={{ 'display': 'flex' }}
                onClick={handleClick}
            >
                {children}
            </button>
            <Menu
                classes={{
                    menubar: 'menu',
                    list: 'menu__list'
                }}
                id="positioned-demo-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                {items.map((item, key) => {
                    return item.title && <MenuItem key={key} className='menu__item'>
                        {
                            item.href ?
                                <Link target={item.newTab && `_blank`} href={item.href}>
                                    {item.icon} {item.title}
                                </Link>
                                :
                                <div onClick={item.onClick}>
                                    {item.icon} {item.title}
                                </div>
                        }
                    </MenuItem>
                })}
            </Menu>
        </div >
    );
}