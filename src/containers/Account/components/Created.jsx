import dynamic from 'next/dynamic'
const NFTCard = dynamic(() => import('@components/Cards/NFTCard'))

import React from 'react'
import { selectBarSwitchGrid, selectFilterProfile } from '@src/store/info/infoSlice';
import { useSelector } from 'react-redux'
import InfiniteScroll from "react-infinite-scroll-component";
import { getNFTs } from '@src/API/nft';
import { useInfiniteQuery } from 'react-query';

export default function Created({ account }) {
  const perPage = 10
  const barSwitchGrid = useSelector(selectBarSwitchGrid);
  const filter = useSelector(selectFilterProfile);

  const { data = [], fetchNextPage, hasNextPage } = useInfiniteQuery(
    [filter, { creatorId: account.id }, perPage],
    getNFTs,
    {
      select: (data) => [...data.pages],
      getNextPageParam: (lastPage, pages) => lastPage.length !== 0 ? pages.length + 1 : undefined
    }
  )

  if (data[0]?.length == 0) return <div className='emptyCollection'>No items to display</div>

  return (
    <div style={{ width: '100%' }} >
      <InfiniteScroll
        className={`account-profile__body__right ${barSwitchGrid}`}
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
    </div>
  )
}
