import Link from 'next/link'
import React from 'react'

export default function DropDownLink({ isOpen, items }) {

    const LinkItem = ({ item }) => {
        return (
            <Link className='dropDownLink__item' href={item?.href} >
                <div className='logo'>{item.logo}</div>
                <div className='title'>{item.title}</div>
            </Link>
        )
    }

    const Item = ({ item }) => {
        return (
            <li onClick={item.onClick} className='dropDownLink__item'>
                <div className='logo'>{item.logo}</div>
                <div className='title'>{item.title}</div>
            </li>
        )
    }

    return (
        <div className={`dropDownLink ${isOpen && 'active'}`}>
            {isOpen && <ul>
                {items.map((item, key) => {
                    return item && (item.href ? <LinkItem key={key} item={item} /> : <Item key={key} item={item} />)
                })}
            </ul>}
        </div>
    )
}
