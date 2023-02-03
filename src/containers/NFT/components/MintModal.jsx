import ModalView from '@components/Common/Modal'
import { getMintTxRaw } from '@src/API/nft'
import useWallet from '@src/hooks/useWallet'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

export default function MintModal({ nft, isOpen, onSuccess }) {
    const [isMint, setIsMint] = useState(false)
    const { sendTx } = useWallet()

    const mintToken = async () => {
        setIsMint(true)
        const tx = await getMintTxRaw({ nftId: nft.id, creator: nft.creator.wallet, percentageCreator: nft.creatorFee })
            .catch(err => {
                const error = err.response.data?.errors[0]?.msg
                toast.error(error || 'Unable to mint nft, please try again later')
            })

        const txHash = await sendTx(tx)


        if (!txHash) {
            setIsMint(false)
            return
        }

        await txHash.wait()

        setTimeout(() => {
            onSuccess()
            setIsMint(false)
        }, 3500)
    }

    useEffect(() => {
        return () => {
            setIsMint(false)
        }
    }, [])

    return (
        <ModalView
            className={'mintModal'}
            title={'Mint NFT'}
            width={500}
            isOpen={isOpen}
        >
            {/* <Image alt="" src={nft?.nftThumbnailImage} width={'300'} height={'300'} /> */}
            <img src={nft?.nftThumbnailImage} width={'300'} height={'300'} />
            <div className='mintModal__info'>
                After confirming Mint for this nft, it will be uploaded to our Smart Contract. It still be necessary to put it on sale If you want someone to buy it.
            </div>
            <div className='mintModal__buttons' >
                <button className='btn btn-blue' onClick={mintToken} disabled={isMint}>
                    {!isMint ? 'Confirm Mint' :
                        <ClipLoader size={14} color='#fff' />
                    }
                </button>
            </div>
        </ModalView>
    )
}
