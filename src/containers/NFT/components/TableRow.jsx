import React, { useEffect } from 'react'
import { TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { sliceText } from '@src/helpers/Common';
import moment from 'moment/moment';
import Link from 'next/link';
import ETHIcon from '@img/main/ETH.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '@src/store/user/userSlice';
import { cancelingOfferByCreator, del, delOffer } from '@src/store/nft/nftSlice';
import { getAcceptOfferRaw, getBuyingByOfferRaw } from '@src/API/offer';
import useWallet from '@src/hooks/useWallet';
import { toast } from 'react-hot-toast';

const urlScan = 'https://goerli.etherscan.io/tx/'

export function RowActivity({ item }) {
    const LinkAdress = ({ user }) => {
        return <Link href={{ pathname: '/account/[wallet]', query: { wallet: user.wallet } }}>
            {user.username || sliceText(user.wallet, 3, '...')}
        </Link>
    }

    return (
        <TableRow className='rowActivity'>
            <TableCell className='rowActivity__cell'>
                <div className='rowActivity__transfer'>
                    {item.transfer?.img}
                    {item.transfer?.name}
                </div>
            </TableCell>
            <TableCell className='rowActivity__cell'>{item?.price}</TableCell>
            <TableCell className='rowActivity__cell'>
                <LinkAdress user={item.args?.from} />
            </TableCell>
            <TableCell className='rowActivity__cell'>
                <LinkAdress user={item.args?.to} />
            </TableCell>
            <TableCell className='rowActivity__cell'>
                <Link target="_blank" href={urlScan + item.txHash}>
                    {moment(item.created).format('DD.MM.YYYY')}
                </Link>
            </TableCell>
        </TableRow>
    )
}


export function RowOffer({ item, nft }) {
    const dispatch = useDispatch()
    const account = useSelector(selectAccount)
    const { sendTx } = useWallet()

    const acceptOfferByOwner = async (id) => {
        const tx = await getAcceptOfferRaw({ id })
        const txHash = await sendTx(tx)

        await txHash.wait()
    }

    const buyByOffer = async (id) => {
        const tx = await getBuyingByOfferRaw({ id })
        const txHash = await sendTx(tx)

        await txHash.wait()
    }

    const cancelOfferByCreator = (id) => {
        dispatch(cancelingOfferByCreator({ id }))
            .then(() => {
                dispatch(delOffer({ id }))
                toast.success('You deleted offer')
            })
    }

    const LinkAdress = ({ user }) => {
        return <Link href={{ pathname: '/account/[wallet]', query: { wallet: user.wallet } }}>
            {user.username}
        </Link>
    }
    return (
        <TableRow className='rowOffer'>
            <TableCell className='rowOffer__cell value'>
                <ETHIcon />
                {item.offer?.minValue}
            </TableCell>
            <TableCell className='rowOffer__cell'>
                <LinkAdress user={item.buyer} />
            </TableCell>
            <TableCell className='rowOffer__cell'>
                {moment(item.created).format('DD.MM.YYYY')}
            </TableCell>
            <TableCell className='rowOffer__cell'>
                <div className='rowOffer__cell__btns'>
                    {account.id === item.buyer?.id && item.offer?.status === 'accepted' &&
                        <button className='btn btn-blue' onClick={() => buyByOffer(item.offer?.id)}>
                            Buy
                        </button>
                    }
                    {account.id === nft.owner?.id && nft.status === 'SALE' &&
                        <button className='btn btn-blue' onClick={() => acceptOfferByOwner(item.offer?.id)}>
                            Accept
                        </button>
                    }
                    {account.id === item.buyer?.id && item.offer?.status === 'created' &&
                        <button className='btn btn-redBorder'
                            onClick={() => cancelOfferByCreator(item.offer?.id)}
                        >
                            Cancel
                        </button>
                    }
                </div>
            </TableCell>
        </TableRow >
    )
}
