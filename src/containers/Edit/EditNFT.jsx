import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Fields from '@components/Inputs/Inputs'
import { selectAccount } from '@src/store/user/userSlice';
import { useSelector } from 'react-redux';
import { updateNFT, deleteNFT, getNFTInfo } from '@src/API/nft';
import { getMyCollections } from '@src/API/collection';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { editNftSchema } from './data';
import { toBase64 } from '@src/helpers/Common';
import Loader from '@components/Common/Loader';


export default function Edit({ id }) {
    const account = useSelector(selectAccount);
    const [collections, setCollections] = useState([])
    const [nft, setNft] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        mode: "onBlur",
        shouldUnregister: true,
        resolver: yupResolver(editNftSchema)
    });

    useEffect(() => {
        if (account.id)
            getMyCollections({ creatorId: account.id, perPage: 10, currentPage: 1 })
                .then(resp => resp.data)
                .then(collections => {
                    collections = collections.map(item => new Object({ value: item.id, name: item.name }))
                    setCollections([...collections])
                    setIsLoading(false)
                })

        if (id) getDataAPI()

    }, [account, id])

    useEffect(() => {
        if (nft)
            reset(nft)
    }, [nft])

    const getDataAPI = async () => {
        let nftData = await getNFTInfo({ id }).then(resp => resp.data)
        setNft(nftData)
    }

    const onDelete = () => {
        deleteNFT({ id })
            .then(() => {
                toast.success('You deleted nft')
                router.push({ pathname: '/collections' })
            })
            .catch(() => {
                toast.error('This nft was not deleted')
            })
    }

    const onSubmit = async (data) => {
        data.id = id
        if (data.nftThumbnailImage?.length > 0 && data.nftThumbnailImage[0]?.size) {
            data.nftImage = await toBase64(data.nftThumbnailImage[0])
        }

        await updateNFT(data)
            .then(resp => resp.data[0])
            .then(() => {
                toast.success('You updated nft')
                router.push({ pathname: '/assets/[id]', query: { id } })
            })
            .catch(() => {
                toast.error('This nft was not updated')
            })
    }

    if (isLoading) return <Loader />

    return (
        <div className='create'>
            <div className='create__container'>
                <h2 className='header'>Edit Item</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fields.image
                        style={{ width: '60%' }}
                        title={'Image'}
                        size={'m'}
                        defaultValue={nft.nftPreviewImage}
                        label='nftThumbnailImage'
                        register={register}
                        error={errors.nftThumbnailImage}
                        required
                    />

                    <Fields.input
                        title={'Name'}
                        label='name'
                        placeholder='Item name'
                        defaultValue={nft.name}
                        register={register}
                        error={errors.name}
                        required
                    />

                    <Fields.input
                        title={'External link'}
                        subTitle={'OpenSea will include a link to this URL on this items detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.'}
                        label='externalLink'
                        defaultValue={nft.externalLink}
                        error={errors.externalLink}
                        placeholder='https://yoursite.io/item/123'
                        register={register}
                    />

                    <Fields.dropDown
                        title={'Collection'}
                        control={control}
                        defaultValue={collections[0]}
                        items={collections}
                        subTitle={'Choose the collection.'}
                        label='collectionId'
                        error={errors.collection}
                    />

                    <Fields.textArea
                        title={'Description'}
                        defaultValue={nft.description}
                        subTitle={'The description will be included on the items detail page underneath its image.'}
                        label='description'
                        error={errors.description}
                        register={register}
                    />

                    <div className='create__btns'>
                        <button className='btn btn-blue' type='submit' >Update</button>
                        {!nft.tokenId && <button className='btn btn-redBorder' type='button' onClick={onDelete} >Delete</button>}
                    </div>

                </form>
            </div>
        </div>
    )
}
