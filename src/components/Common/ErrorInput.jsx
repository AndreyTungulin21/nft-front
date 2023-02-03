import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function ErrorInput({ children }) {
    return (
        <div className='errorInput'>
            <CloseIcon />
            <div className='errorInput__text'>
                {children}
            </div>
        </div>
    )
}
