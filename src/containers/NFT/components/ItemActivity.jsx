import React, { useState, useEffect } from 'react'
import { Table, TableCell, TableBody, TableRow, TableHead, TableContainer } from '@mui/material';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OutboundIcon from '@mui/icons-material/Outbound';
import TransformIcon from '@mui/icons-material/Transform';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { RowActivity } from './TableRow';
import NoHistoryData from '@components/NoHistoryData/NoHistoryData';

export default function ItemActivity({ activity }) {
    if (activity.length === 0) {
        return <NoHistoryData style={{ height: '200px' }} />
    }

    return (
        <TableContainer>
            <Table aria-labelledby="tableTitle">
                <TableHead>
                    <TableRow>
                        <TableCell>Event</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                < TableBody >
                    {activity?.map((data, key) => {
                        let img, name
                        let args = JSON.parse(data.args)

                        switch (data.eventName) {
                            case 'MadeOffer':
                                img = <LocalOfferIcon />
                                name = 'Buy by offer'
                                break;
                            case 'MarketItemCreated':
                                img = <AutoAwesomeIcon />
                                name = 'Minted'
                                break;
                            case 'SaleItem':
                                img = <ShoppingCartIcon />
                                name = 'Sale'
                                break;
                            case 'BuyItem':
                                img = <OutboundIcon />
                                name = 'Buy'
                                break;
                            case 'Transfer':
                                img = <TransformIcon />
                                name = 'Transfer'
                                break;
                        }

                        return <RowActivity key={key} item={{
                            transfer: { img, name },
                            ...data,
                            args: args.argsStatistic
                        }} />
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    )
}
