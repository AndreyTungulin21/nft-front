import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useWallet from '@src/hooks/useWallet';
import { useForm, useWatch } from 'react-hook-form'

import ModalView from '@components/Common/Modal'
import Fields from '@components/Inputs/Inputs'
import { ClipLoader } from 'react-spinners';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSaleTxRaw } from '@src/API/nft';
import { selectMainInfo } from '@src/store/info/infoSlice';
import { saleSchema } from '../data';


export default function SaleModal({ nft, onSuccess, isOpen }) {
    const { sendTx } = useWallet()
    const [isSale, setIsSale] = useState(false)
    const mainInfo = useSelector(selectMainInfo);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        resolver: yupResolver(saleSchema)
    })
    const price = useWatch({ control, name: "price", defaultValue: '--' });

    const onSubmit = async (data) => {
        setIsSale(true)
        const tx = await getSaleTxRaw({ tokenId: nft.tokenId, price: data.price })
        const txHash = await sendTx(tx)

        if (!txHash) {
            setIsSale(false)
            return
        }

        await txHash.wait()

        setTimeout(() => {
            onSuccess()
            setIsSale(false)
        }, 3500)
    }


    return (
        <ModalView
            className={'saleModal'}
            width={500}
            isOpen={isOpen}
            title={'Sale NFT'}
        >
            <div className='saleModal__body'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fields.input
                        title={'Set a price'}
                        label='price'
                        register={register}
                        error={errors.price}
                        placeholder='Amount'
                    />

                    <div className='saleModal__summary'>
                        <div className='saleModal__summary__title'>Summary</div>
                        <div className='saleModal__summary__item'>
                            <div className='summary__item__left'>Listing price</div>
                            <div className='summary__item__right'>{Number(price) ? price : '--'} ETH</div>
                        </div>
                        <div className='saleModal__summary__item'>
                            <div className='summary__item__left'>Service fee</div>
                            <div className='summary__item__right'>{price !== '--' && Number(price) ? parseFloat((price * mainInfo.serviceFee / 100).toPrecision(12)) : '--'} ({mainInfo.serviceFee} %)</div>
                        </div>
                    </div>

                    <div className='saleModal__summary__potentional'>
                        <div className='potentional__left'>Potential earnings</div>
                        <div className='potentional__right'>{Number(price) ? price : '--'} ETH</div>

                    </div>

                    <button className='btn btn-blue' disabled={isSale}>
                        {!isSale ? 'Complete listing' :
                            <ClipLoader size={14} color='#fff' />
                        }
                    </button>
                </form>
            </div>
        </ModalView>
    )
}
