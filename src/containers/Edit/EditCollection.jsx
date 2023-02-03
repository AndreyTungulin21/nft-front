import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { categoryItems } from '@src/helpers/variables';
import Fields from '@components/Inputs/Inputs'


import { getCollectionInfo } from '@src/API/collection';
import { updaterCollection } from '@src/store/collection/collectionSlice';
import { editCollectionSchema } from './data';
import { toBase64 } from '@src/helpers/Common';

export default function EditCollection({ customUrl }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [collection, setCollection] = useState({})

    useEffect(() => {
        if (customUrl) getDataApi()
    }, [customUrl])

    useEffect(() => {
        if (collection) reset(collection)
    }, [collection])

    const getDataApi = async () => {
        let collectionInfo = await getCollectionInfo({ customUrl }).then(resp => resp.data)
        setCollection(collectionInfo)
    }

    const { register, handleSubmit, control, reset, getValues, formState: { errors } } = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        defaultValues: {
            ...collection,
            categoryId: categoryItems.find(item => item.value === collection.categoryId),
        },
        resolver: yupResolver(editCollectionSchema)
    });

    const onSubmit = async (data) => {
        data.id = collection.id


        if (data.collectionImg?.length > 0 && data.collectionImg[0]?.size) {
            data.logoImage = await toBase64(data.collectionImg[0])
        }

        if (data.collectionBackImg?.length > 0 && data.collectionBackImg[0]?.size) {
            data.bannerImage = await toBase64(data.collectionBackImg[0])
        }

        delete data.collectionImg
        delete data.collectionBackImg

        dispatch(updaterCollection(data))
            .then(() => {
                toast.success('The collection has been successfully updated')
                router.push('/collections')
            })
    }

    return (
        <div className='editCollection'>
            <div className='editCollection__container'>
                <h2 className='header'>Edit a Collection</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fields.image
                        title={'Logo image'}
                        subTitle={'This image will also be used for navigation. 350 x 350 recommended.'}
                        size={'radius'}
                        defaultValue={getValues('collectionImg')}
                        label='collectionImg'
                        register={register}
                        error={errors.collectionImg}
                        required
                    />

                    <Fields.image
                        title={'Banner image'}
                        subTitle={'This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.'}
                        size={'m'}
                        defaultValue={getValues('collectionBackImg')}
                        label='collectionBackImg'
                        register={register}
                        error={errors.collectionBackImg}
                        required
                    />

                    <Fields.input
                        title={'Name'}
                        label='name'
                        error={errors.name}
                        placeholder='Example: Sea'
                        register={register}
                        required
                    />

                    <Fields.dropDown
                        title={'Category'}
                        control={control}
                        items={categoryItems}
                        subTitle={'Adding a category will help make your item discoverable on 555NFT.'}
                        label='categoryId'
                        error={errors.categoryId}
                    />

                    <Fields.textArea
                        title={'Description'}
                        label='description'
                        error={errors.description}
                        register={register}
                    />

                    <Fields.input
                        title={'Creator fee'}
                        label='creatorFee'
                        error={errors.creatorFee}
                        placeholder='Example: 10'
                        register={register}
                        required
                    />

                    <button className='btn btn-blue' type='submit' >Update</button>
                </form>
            </div>
        </div>
    )
}
