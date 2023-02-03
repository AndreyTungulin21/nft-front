import ModalView from '@components/Common/Modal'
import { getBuyTxRaw } from '@src/API/nft'
import useWallet from '@src/hooks/useWallet'
import { selectMainInfo } from '@src/store/info/infoSlice'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

export default function BuyModal({ nft, isOpen, onSuccess }) {
    const [isBuy, setIsBuy] = useState(false)
    const { sendTx } = useWallet()
    const mainInfo = useSelector(selectMainInfo);

    const buyToken = async () => {
        setIsBuy(true)
        const tx = await getBuyTxRaw({ tokenId: nft.tokenId })
        const txHash = await sendTx(tx)

        if (!txHash) {
            setIsBuy(false)
            return
        }

        await txHash.wait()

        setTimeout(() => {
            onSuccess()
            setIsBuy(false)
        }, 3500)
    }

    useEffect(() => {
        return () => {
            setIsBuy(false)
        }
    }, [])

    const countFee = (price, fee) => {
        return parseFloat((price * fee / 100).toPrecision(12))
    }

    return (
        <ModalView
            className={'buyModal'}
            title={'Buy NFT'}
            width={500}
            isOpen={isOpen}
        >
            <Image alt="" src={nft?.nftThumbnailImage} width={'300'} height={'300'} />
            <div className='buyModal__body'>
                <div className='buyModal__summary'>
                    <div className='buyModal__summary__title'>Summary</div>
                    <div className='buyModal__summary__item'>
                        <div className='summary__item__left'>Listing price</div>
                        <div className='summary__item__right'>{nft.price} ETH</div>
                    </div>
                    <div className='buyModal__summary__item'>
                        <div className='summary__item__left'>Service fee</div>
                        <div className='summary__item__right'>{countFee(nft.price, mainInfo.serviceFee)} ({mainInfo.serviceFee}%)</div>
                    </div>
                    <div className='buyModal__summary__item'>
                        <div className='summary__item__left'>Creator fee</div>
                        <div className='summary__item__right'>{countFee(nft.price, nft.creatorFee)} ({nft.creatorFee}%)</div>
                    </div>
                </div>
            </div>
            <div className='buyModal__buttons' >
                <button className='btn btn-blue' onClick={buyToken} disabled={isBuy}>
                    {!isBuy ? 'Buy' :
                        <ClipLoader size={14} color='#fff' />
                    }
                </button>
            </div>
        </ModalView>
    )
}
