import React, { useState } from 'react'
import MyCollectionCard from '@components/Cards/MyCollectionCard'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccount } from '@src/store/user/userSlice'
import InfiniteScroll from "react-infinite-scroll-component";
import { myCollectionsUser, reset, selectCollections } from '@src/store/collection/collectionSlice'

export default function MyCollections() {
    const router = useRouter()
    const dispatch = useDispatch()
    const account = useSelector(selectAccount);
    const cardsCollection = useSelector(selectCollections);
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (account.id) {
            getDataApi()
        }

        return (() => dispatch(reset()))
    }, [account])

    const getDataApi = async () => {
        dispatch(
            myCollectionsUser({
                creatorId: account.id,
                perPage: 10,
                currentPage: 1
            }))
            .then(() => setPage(page + 1))
    }

    const onRedirectToCreateCollection = () => {
        router.push('/collection/create')
    }

    return (
        <div className='myCollections'>
            <header className='myCollections__header'>
                <h1>My collections</h1>
                <span>Create, curate, and manage collections of unique NFTs to share and sell.</span>
                <div className='myCollections__btns'>
                    <button onClick={onRedirectToCreateCollection} className='btn btn-blue' type='submit' >Create a collection</button>
                </div>
            </header>
            <InfiniteScroll
                className='myCollections__grid'
                dataLength={cardsCollection.length}
            // next={() => getDataApi()}
            // hasMore={true}
            >
                {cardsCollection.map((item, i) => {
                    return <MyCollectionCard key={i} item={item} />
                }
                )}
            </InfiniteScroll>
        </div>
    )
}
