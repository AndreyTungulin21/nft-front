import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput({ label, register }) {
    return (
        <div className='searchInput'>
            <div className='searchInput__icon'>
                <SearchIcon />
            </div>
            <input type="text" {...register(label)} placeholder="Search by name" />
        </div>
    )
}
