import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function SeeMore({ text, length = 50 }) {
    const [isOpen, setIsOpen] = useState(false)
    const onClickToggle = () => setIsOpen(!isOpen)

    return (
        <div className='seeMore'>
            <div className='seeMore__text'>

                {(text?.length > length && !isOpen) && text.slice(0, 50) + '...'}
                {(text?.length < length || text?.length > length && isOpen) && text}

                {text?.length > length &&
                    <button onClick={onClickToggle} className='seeMore__open'>
                        {!isOpen ? 'See more' : 'See less'}
                        {!isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </button>
                }
            </div>
        </div>
    )
}
