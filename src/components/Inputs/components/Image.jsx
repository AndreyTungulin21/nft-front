import React from 'react'
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import { useEffect } from 'react';
import ErrorInput from '@components/Common/ErrorInput';

export default function Image({
    defaultValue,
    className = '',
    title = '',
    size = '',
    subTitle = '',
    label,
    placeholder = '',
    register,
    required,
    style,
    error }) {

    const [img, setImg] = useState('')

    useEffect(() => {
        if (defaultValue) {
            setImg(defaultValue)
        }
    }, [defaultValue])

    const onChangePicture = (e) => {

        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.addEventListener("load", () => {
                setImg(reader.result)
            });
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setImg('')
        }
    }

    return (
        <div className={`inputContainerImage ${className}`} style={style}>
            {title && <div className='inputContainerImage__title' >
                <h4>{title}</h4>
                {required && <h4 className='required'>*</h4>}
            </div>}
            {subTitle && <div className='inputContainerImage__subTitle'>
                {subTitle}
            </div>}
            <div className={`inputContainerImage__body ${size ? `--${size}` : ''} ${error ? '--error' : ''}`}>
                {img && <div className='imgResult' style={{ width: '100%', height: '100%' }}>
                    <img style={{ objectFit: "cover", width: '100%', height: '100%' }} src={img} />
                </div>}
                {!img &&
                    <ImageIcon className='imageIcon' />
                }
                <input onInput={onChangePicture} type="file" placeholder={placeholder} {...register(label, { required, value: defaultValue })} />
            </div>
            {error && <ErrorInput>
                {error.message}
            </ErrorInput>}
        </div>
    )
}
