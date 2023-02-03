import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast';
import PositionedMenu from '@components/Menu/PositionedMenu';
import { delCollection } from '@src/store/collection/collectionSlice';
import { deleteCollection } from '@src/API/collection';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MyCollectionCard({ item }) {
    const dispatch = useDispatch()

    const onDeleteCollection = async () => {
        await deleteCollection({ id: item.id })
            .then(() => {
                dispatch(delCollection({ id: item.id }))
                toast.success('You deleted collection.')
            })
            .catch(err => {
                toast.error(err.response.data.errors[0].msg || 'Something going wrong...')
            })
    }

    const settingItems = [
        {
            title: "Edit",
            icon: <EditIcon />,
            href: { pathname: '/collection/[customUrl]/edit', query: { customUrl: item.customUrl } }
        },
        {
            title: "Delete",
            icon: <DeleteIcon />,
            onClick: onDeleteCollection
        },
    ]


    return (
        <div className='collection-card'>
            <PositionedMenu items={settingItems} className='collection-card__btn' >
                <MoreVertIcon />
            </PositionedMenu>
            <Link href={{ pathname: '/collection/[customUrl]', query: { customUrl: item.customUrl } }} >
                <div style={{ 'width': '100%', 'height': '100%' }}>
                    <div className='collection-card__img'>
                        <img src={item.collectionBackImg} />
                    </div>
                    <div className='collection-card__body'>
                        <div className='img'>
                            <img src={item.collectionImg} />
                        </div>
                        <div className='name'>{item.name}</div>
                    </div>
                </div>
            </Link>

        </div>
    )
}
