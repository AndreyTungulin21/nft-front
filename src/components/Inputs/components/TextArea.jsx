import ErrorInput from '@components/Common/ErrorInput'
import React from 'react'

export default function TextArea({ defaultValue, title = '', subTitle = '', label, placeholder = '', register, required, error }) {
    return (
        <div className='textArea'>
            {title && <div className='textArea__title' >
                <h4>{title}</h4>
                {required && <h4 className='required'>*</h4>}
            </div>}
            {subTitle && <div className='textArea__subTitle'>
                {subTitle}
            </div>}
            <div className='textArea__body'>
                <textarea placeholder={placeholder} {...register(label, { required, value: defaultValue })} />
            </div>
            {error?.message && <ErrorInput>
                {error?.message}
            </ErrorInput>}
        </div>
    )
}
