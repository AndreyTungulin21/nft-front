import dynamic from 'next/dynamic'
const NFTCard = dynamic(() => import('@components/Cards/NFTCard'))

import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import { selectBarSwitchGrid, selectFilterProfile } from '@src/store/info/infoSlice';
import { useInfiniteQuery } from 'react-query';
import { getNFTs } from '@src/API/nft';

export default function Items({ collection }) {
  const perPage = 10
  const barSwitchGrid = useSelector(selectBarSwitchGrid);
  const filter = useSelector(selectFilterProfile);

  const { data = [], fetchNextPage, hasNextPage } = useInfiniteQuery(
    [filter, { collectionId: collection.id }, perPage],
    getNFTs,
    {
      select: (data) => [...data.pages],
      getNextPageParam: (lastPage, pages) => lastPage.length !== 0 ? pages.length + 1 : undefined
    }
  )

  if (data[0]?.length == 0) return <div className='emptyCollection'>No items to display</div>

  return (
    <InfiniteScroll
      className={`collection-profile__body__right ${barSwitchGrid}`}
      style={{ overflow: 'hidden' }}
      dataLength={data.length * perPage}
      next={fetchNextPage}
      hasMore={hasNextPage}
    >
      {data.map((page, i) => {
        return <React.Fragment key={i}>
          {page.map((item, key) => {
            return <NFTCard key={key} item={item} />
          })}
        </React.Fragment>
      })}
    </InfiniteScroll>

  )
}
