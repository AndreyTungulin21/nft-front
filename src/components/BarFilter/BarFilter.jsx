import Fields from '@components/Inputs/Inputs'
import { categoryItems } from '@src/helpers/variables'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export default function BarFilter() {
    const dispatch = useDispatch()

    const status = [
        { value: 1, name: 'Buy now', label: 'buyNow' },
        { value: 2, name: 'Has Offers', label: 'hasOffer' },
    ]

    const { register, watch, handleSubmit, control } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            buyNow: false,
            hasOffer: false,
            art: false,
            collectibles: false,
            music: false,
            photography: false,
            tradingCards: false,
            sports: false,
            virtualWorlds: false
        }
    })

    return (
        <div className='barBody'>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <Fields.navList title='Status'>
                {status.map((item, key) => {
                    return <Fields.checkbox
                        key={key}
                        name={item.name}
                        label={item.label}
                        control={control}
                    />
                })}
            </Fields.navList>

            <Fields.navList title='Categories'>
                {categoryItems.map((item, key) => {
                    return <Fields.checkbox
                        key={key}
                        name={item.name}
                        label={item.label}
                        control={control}
                    />
                })}
            </Fields.navList>
            {/* </form> */}
        </div>
    )
}
