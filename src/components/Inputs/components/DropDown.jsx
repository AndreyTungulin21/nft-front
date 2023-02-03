import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Controller } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export default function DropDown({ label, control, defaultValue, items, title = '', subTitle = '', required, error }) {
    return <Controller
        control={control}
        name={label}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => {
            return <div className='inputContainerDropDown'>
                {title && <div className='inputContainerDropDown__title' >
                    <h4>{title}</h4>
                    {required && <h4 className='required'>*</h4>}
                </div>}
                {subTitle && <div className='inputContainerDropDown__subTitle'>
                    {subTitle}
                </div>}
                <div className='inputContainerDropDown__body'>
                    <Select
                        onChange={onChange}
                        value={value}
                        defaultValue={items[0]?.value}
                        IconComponent={ExpandMoreIcon}
                    >
                        {items.map((item, key) => {
                            return <MenuItem key={key} value={item.value}>
                                {/* {item.img && <img src={item.img} />} */}
                                {item.name}
                            </MenuItem>
                        })}
                    </Select>
                </div>
                {error?.message && <ErrorInput>
                    {error?.message}
                </ErrorInput>}
            </div >
        }}
    />
}
