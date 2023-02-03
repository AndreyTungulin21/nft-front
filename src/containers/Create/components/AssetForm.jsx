import React from 'react'
import AddIcon from '@mui/icons-material/Add';

export default function AssetForm({ onClick, control, item }) {

    return (
        <div className='assetForm'>
            <div className='assetForm__left'>{item.img}</div>
            <div className='assetForm__center'>
                <div className='assetForm__center__title'>{item.title}</div>
                <div className='assetForm__center__subTitle'>{item.subTitle}</div>
            </div>
            <div className='assetForm__right'>
                <button className='btn btn-white' onClick={onClick} type='button'>
                    <AddIcon />
                </button>
            </div>
        </div>
    )
}
