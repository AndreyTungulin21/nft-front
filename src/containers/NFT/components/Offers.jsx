import NoHistoryData from '@components/NoHistoryData/NoHistoryData'
import { Table, TableCell, TableBody, TableRow, TableHead, TableContainer } from '@mui/material';
import React, { useEffect } from 'react'
import { RowOffer } from './TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { gettingOfferByTokenId, selectOffers } from '@src/store/nft/nftSlice';

export default function Offers({ nft }) {
    const dispatch = useDispatch()
    const offers = useSelector(selectOffers)

    useEffect(() => {
        if (nft.tokenId) {
            getOffers()
        }
    }, [nft.tokenId])

    const getOffers = async () => {
        dispatch(gettingOfferByTokenId({ tokenId: nft.tokenId }))
    }

    if (offers.length === 0) {
        return <NoHistoryData style={{ height: '200px' }} />
    }

    return (
        <TableContainer style={{ maxHeight: '240px' }}>
            <Table aria-labelledby="tableTitle">
                <TableHead>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Events</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {offers?.map((data, i) => {
                        return <RowOffer key={i} item={data} nft={nft} />
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    )
}
