import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function AutoComplete({ title = '', label, control, required, defaultOption, options }) {

    return (
        <Controller
            name={label}
            control={control}
            defaultValue={defaultOption}
            render={({ field }) => {
                return <div className='inputContainerDropDown'>
                    {title && <div className='inputContainerDropDown__title' >
                        <h4>{title}</h4>
                        {required && <h4 className='required'>*</h4>}
                    </div>}
                    <div className='inputContainerDropDown__body'>
                        <Autocomplete
                            id="combo-box-demo"
                            {...field}
                            options={options}
                            fullWidth
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" fullWidth />
                            )}
                        />
                    </div>
                </div>


            }}
        />
    )
}
