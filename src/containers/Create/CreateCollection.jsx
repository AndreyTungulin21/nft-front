import React from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Fields from '@components/Inputs/Inputs'
import { addCollection } from '@src/API/collection';
import { selectAccount } from '@src/store/user/userSlice';
import { categoryItems } from '@src/helpers/variables';
import { toast } from 'react-hot-toast';
import { createCollectionSchema } from './data';
import { toBase64 } from '@src/helpers/Common';

export default function CreateCollection() {
    const account = useSelector(selectAccount);
    const router = useRouter()

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        defaultValues: {
            collectionImg: '',
            collectionBackImg: '',
            name: '',
            categoryId: categoryItems[0].value,
            description: '',
            creatorFee: ''
        },
        resolver: yupResolver(createCollectionSchema)
    });

    const onSubmit = async (data) => {
        data.creatorId = account.id
        data.logoImage = await toBase64(data.collectionImg[0])
        data.bannerImage = await toBase64(data.collectionBackImg[0])

        addCollection(data)
            .then(() => {
                toast.success('The collection was saved')
                router.push('/collections')
            })
            .catch(() => {
                toast.error('The collection was not saved')
            })
    }

    return (
        <div className='createCollection'>
            <div className='createCollection__container'>
                <h2 className='header'>Create a Collection</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fields.image
                        title={'Logo image'}
                        subTitle={'This image will also be used for navigation. 350 x 350 recommended.'}
                        size={'radius'}
                        label='collectionImg'
                        register={register}
                        error={errors.collectionImg}
                        required
                    />

                    <Fields.image
                        title={'Banner image'}
                        subTitle={'This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.'}
                        size={'m'}
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

                    <Fields.input
                        title={'URL'}
                        subTitle={'Customize your URL on 555NFT. Must only contain lowercase letters, numbers, and hyphens.'}
                        label='customUrl'
                        error={errors.customUrl}
                        placeholder='Example: Sea'
                        register={register}
                        required
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

                    <button className='btn btn-blue' type='submit'>Save</button>
                </form>
            </div>
        </div>
    )
}
