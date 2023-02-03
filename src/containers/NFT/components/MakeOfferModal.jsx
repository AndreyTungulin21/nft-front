import ModalView from '@components/Common/Modal'
import { useForm } from 'react-hook-form'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import Fields from '@components/Inputs/Inputs'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { creatingOffer } from '@src/store/nft/nftSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { makeOfferSchema } from '../data';

export default function MakeOfferModal({ nft, isOpen, onSuccess }) {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        resolver: yupResolver(makeOfferSchema)
    })

    const onSubmit = async (data) => {
        data.tokenId = nft.tokenId
        dispatch(creatingOffer(data))
            .then(unwrapResult)
            .then(() => {
                onSuccess()
                toast.success('You created offer.')
            })
            .catch(err => {
                toast.error(err.response?.data.errors[0].msg || 'Something going wrong.')
            })
    }

    return (
        <ModalView
            className={'makeModal'}
            title={'Make offer'}
            width={500}
            isOpen={isOpen}
        >
            <div className='makeModal__body'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fields.input
                        title={'Set a price'}
                        label='minValue'
                        register={register}
                        error={errors.minValue}
                        placeholder='Amount'
                    />
                    <button type='submit' className='btn btn-blue'>
                        Make offer
                    </button>
                </form>
            </div>
        </ModalView>
    )
}
