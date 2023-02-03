import NoHistoryData from '@components/NoHistoryData/NoHistoryData'
import { Table, TableCell, TableBody, TableRow, TableHead, TableContainer } from '@mui/material'
import React from 'react'
import Link from 'next/link';

export default function Listing({ nft = {} }) {

    if (!nft.price) {
        return <NoHistoryData style={{ height: '200px' }} />
    }

    return (
        <TableContainer style={{ maxHeight: '240px' }}>
            <Table aria-labelledby="tableTitle">
                <TableHead>
                    <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>Creator</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {nft.price}
                        </TableCell>
                        <TableCell>
                            <Link href={{ pathname: '/account/[wallet]', query: { wallet: nft.owner.wallet } }}>
                                {nft.owner.username}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Link href={{ pathname: '/account/[wallet]', query: { wallet: nft.creator.wallet } }}>
                                {nft.creator.username}
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    )
}
