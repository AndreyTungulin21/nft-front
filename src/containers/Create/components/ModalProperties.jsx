import ModalView from '@components/Common/Modal'
import Fields from '@components/Inputs/Inputs'
import React from 'react'
import { useFieldArray } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

export default function ModalProperties({ isOpen, control, watch, register }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "properties"
    });

    // const properties = watch("properties", fields);

    // useEffect(() => {
    //     console.log('properties', properties);
    // }, [properties])

    return (
        <ModalView
            className={'create__container__properties'}
            title={'Add Properties'}
            width={550}
            isOpen={isOpen}
        >
            <div className='propertiesModal__body'>
                <div className='propertiesModal__body__subTitle'>
                    Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
                </div>
                {fields.map((item, index) =>
                    <div key={item.id} className='create__container__properties__item'>
                        <CloseIcon onClick={() => remove(index)} />
                        <Fields.input
                            label={`properties.${index}.character`}
                            placeholder='Character'
                            register={register}
                        />
                        <Fields.input
                            label={`properties.${index}.male`}
                            placeholder='Male'
                            register={register}
                        />
                    </div>
                )}
                <button className='btn btn-white' onClick={() => append({ character: '', male: '' })}>Add more</button>
                <button className='btn btn-blue' type='submit'>Save</button>
            </div>
        </ModalView>
    )
}
