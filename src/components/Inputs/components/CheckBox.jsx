import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { useEffect } from 'react';
import CheckboxMUI from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';



export default function CheckBox({ label, control, onChange, name }) {

    return (
        <Controller
            name={label}
            control={control}
            render={({ field: props }) => (
                <li className='checkBox__item'>
                    <div className='checkBox__item__left'>{name}</div>
                    <div className='checkBox__item__right'>
                        <CheckboxMUI
                            checkedIcon={
                                <label className='checkBox'>
                                    <input
                                        type="checkbox"
                                        className={'checkbox active'}
                                    />
                                    <DoneIcon />
                                </label>
                            }
                            icon={
                                <label className='checkBox'>
                                    <input
                                        type="checkbox"
                                        className={'checkbox'}
                                    />
                                </label>
                            }
                            {...props}
                            checked={props.value}
                            onChange={(e) => props.onChange(e.target.checked)}
                        />
                    </div>
                </li>
            )
            }
        />
    );
};
