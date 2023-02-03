import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Fields from '@components/Inputs/Inputs'
import { selectAccount } from '@src/store/user/userSlice';
import { useSelector } from 'react-redux';
import { createNFT } from '@src/API/nft';
import { getMyCollections } from '@src/API/collection';
import { useRouter } from 'next/router';
import { createNftSchema } from './data';
import { toBase64 } from '@src/helpers/Common';
import Loader from '@components/Common/Loader';
import ModalProperties from './components/ModalProperties';
import AssetForm from './components/AssetForm';
import ListIcon from '@mui/icons-material/List';


export default function CreateNFT() {
  const account = useSelector(selectAccount);
  const [collections, setCollections] = useState([])
  const [isOpenProperties, setIsOpenProperties] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const { register, watch, handleSubmit, control, formState: { errors } } = useForm({
    mode: "onBlur",
    shouldUnregister: true,
    resolver: yupResolver(createNftSchema)
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
  }, [account])

  const onSubmit = async (data) => {
    data.nftImage = await toBase64(data.nftThumbnailImage[0])
    data.creatorId = account.id
    data.chainId = 5
    data.creatorFee = collections.find(el => el.value === data.collectionId)?.creatorFee

    const nftData = await createNFT(data).then(resp => resp.data[0])
    router.push({ pathname: '/assets/[id]', query: { id: nftData.id } })
  }

  if (isLoading) return <Loader />

  return (
    <div className='create'>
      <div className='create__container'>
        <h2 className='header'>Create New Item</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fields.image
            style={{ width: '60%' }}
            title={'Image'}
            size={'m'}
            label='nftThumbnailImage'
            register={register}
            error={errors.nftThumbnailImage}
            required
          />

          <Fields.input
            title={'Name'}
            label='name'
            placeholder='Item name'
            register={register}
            error={errors.name}
            required
          />

          <Fields.input
            title={'External link'}
            subTitle={'OpenSea will include a link to this URL on this items detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.'}
            label='externalLink'
            error={errors.externalLink}
            placeholder='https://yoursite.io/item/123'
            register={register}
          />

          <Fields.dropDown
            title={'Collection'}
            control={control}
            defaultValue={collections[0]?.value}
            items={collections}
            subTitle={'Choose the collection.'}
            label='collectionId'
            error={errors.collection}
          />

          {/* <AssetForm
            onClick={() => setIsOpenProperties(!isOpenProperties)}
            control={control}
            item={{
              img: <ListIcon />,
              title: 'Properties',
              subTitle: 'Textual traits that show up as rectangles',
            }}
          /> */}

          <Fields.textArea
            title={'Description'}
            subTitle={'The description will be included on the items detail page underneath its image.'}
            label='description'
            error={errors.description}
            register={register}
          />
          <button className='btn btn-blue' type='submit' >Create</button>
        </form>
      </div>
      {/* <ModalProperties isOpen={isOpenProperties} control={control} watch={watch} register={register} /> */}
    </div>
  )
}
