import React from 'react'
import { useState } from 'react'
import Fields from '../Inputs'

export default function Radio({ label, isMulti = false, items, onChange }) {

    const [selectedItems, setSelectedItems] = useState([])

    const onChangeRadio = (value) => {
        if (!isMulti) {
            setSelectedItems([value])
        }

        onChange(selectedItems)
    }

    return (
        <ul className='radio'>
            {
                items.map((item, key) => {
                    return <li key={key} className='radio__item'>
                        <div className='radio__item__left'>{item.name}</div>
                        <div className='radio__item__right'>
                            {/* <Fields.checkbox key={key} onChange={() => {
                                onChangeRadio(item)
                            }}
                            /> */}
                        </div>
                    </li>
                })
            }
        </ul>
    )
}
