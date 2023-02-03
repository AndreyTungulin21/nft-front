import CollectionCard from '@components/Cards/CollectionCard'
import TabsContent from '@components/Tabs/TabsContent'
import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { getExploreCollection } from '@src/API/collection';
import { useEffect } from 'react';
import { categoryItems } from '@src/helpers/variables';
import { useRouter } from 'next/router';
import { useReducer } from 'react';


export default function ExploreCollection() {
    const router = useRouter()

    function reducer(state, action) {
        switch (action.type) {
            case 'updateTab':
                return {
                    page: 1,
                    activeTab: action.payload,
                    collectionsData: [],
                    lastPage: state.lastPage
                }
            case 'updateCollections':
                return {
                    collectionsData: [...state.collectionsData, ...action.payload.data],
                    page: state.page + 1,
                    activeTab: state.activeTab,
                    lastPage: action.payload.pagination.lastPage
                }
            case 'reset':
                return {
                    page: 1,
                    activeTab: state.activeTab,
                    collectionsData: [],
                    lastPage: state.lastPage
                }
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        page: 1,
        activeTab: categoryItems.find(item => item.name === router.query?.name) || categoryItems[0],
        collectionsData: [],
        lastPage: 0
    })


    useEffect(() => {
        fetchMoreData()
    }, [state.activeTab])

    const onClickTab = (item) => {
        if (item.value !== state.activeTab.value)
            dispatch({ type: 'updateTab', payload: item })
    }

    const fetchMoreData = async () => {
        let collections = await getExploreCollection({
            perPage: 10,
            currentPage: state.page,
            categoryId: state.activeTab.value
        }).then(resp => resp.data)

        dispatch({ type: 'updateCollections', payload: collections })
    }

    return (
        <div className='explore-collections'>
            <h1> Explore collections</h1>
            <TabsContent tabs={categoryItems} activeTab={state.activeTab} onClickTab={onClickTab} />
            <InfiniteScroll
                className='explore-collections__body'
                dataLength={state.collectionsData.length}
                scrollThreshold={0.6}
                next={fetchMoreData}
                hasMore={state.lastPage === state.page}
            >
                {state.collectionsData.map((item, i) => {
                    return <CollectionCard key={i} item={item} />
                }
                )}
            </InfiniteScroll>
        </div>
    )
}
