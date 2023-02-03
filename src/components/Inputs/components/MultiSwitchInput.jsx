import React, { useState } from 'react'
import { useEffect } from 'react'


export default function MultiSwitchInput({ defaultValue, btns = [], onChange }) {

    const [isSelect, setIsSelect] = useState('')

    useEffect(() => {
        onSelectSwitch(btns[0])
    }, [])

    const onSelectSwitch = (btn) => {
        setIsSelect(btn.title)
        onChange(btn)
    }

    return (
        <div className='multiSwitchInput'>
            {btns.map((btn, i) => {
                return <button onClick={() => onSelectSwitch(btn)} key={i} className={`multiSwitchInput__btn ${isSelect === btn.title ? 'active' : ''}`}>
                    {btn.icon}
                </button>
            })}
        </div >
    )
}
