import ErrorInput from '@components/Common/ErrorInput'
import React from 'react'

export default function Input({ defaultValue, title = '', subTitle = '', label, placeholder = '', register, onChange, required, error }) {
    return (
        <div className='inputContainer'>
            {title && <div className='inputContainer__title' >
                <h4>{title}</h4>
                {required && <h4 className='required'>*</h4>}
            </div>}
            {subTitle && <div className='inputContainer__subTitle'>
                {subTitle}
            </div>}
            <div className='inputContainer__body'>
                <input onChange={onChange} placeholder={placeholder} {...register(label, { required, value: defaultValue })} />
            </div>
            {error?.message && <ErrorInput>
                {error?.message}
            </ErrorInput>}
        </div >
    )
}
