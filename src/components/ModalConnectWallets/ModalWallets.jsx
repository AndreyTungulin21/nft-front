import React, { useEffect } from 'react'
import MetamaskIcon from '@img/wallets/metamask-fox.svg?jsx'
import useWallet from '@src/hooks/useWallet'
import { useRouter } from 'next/router'
import { signIn } from "next-auth/react";
import { toast } from 'react-hot-toast';

import { ClipLoader } from "react-spinners";
import { useState } from 'react';


export default function ModalWallets() {

    const { connectWallet, signMessage } = useWallet()
    const [isConnect, setIsConnect] = useState(false)
    const router = useRouter()

    const connect = async () => {
        setIsConnect(true)
        const wallet = await connectWallet()
        const signRequest = await signMessage('Confirm authorization in 555NFT with your account.')
            .catch(err => {
                if (err.code === 'UNSUPPORTED_OPERATION') {
                    toast.error('Open Metamask and input your password first')
                }
            })

        if (!signRequest) {
            setIsConnect(false)
            return
        }

        signIn('credentials', {
            wallet,
            signRequest,
            redirect: false
        })
            .then(resp => {
                if (resp.ok) {
                    router.push({ pathname: '/account/[wallet]', query: { wallet } })
                } else {
                    toast.error(resp.error)
                }
            })

        setIsConnect(false)
    }

    return (
        <ul className='modalWallets'>
            <li className='modalWallets__item'>
                <button disabled={isConnect} onClick={() => connect('metamask')}>
                    <div className='modalWallets__item__info'>
                        <MetamaskIcon />
                        <div className='modalWallets__item__info__name'>Metamask</div>
                    </div>
                    {isConnect && <ClipLoader size={20} className='loader' />}
                </button>
            </li>
        </ul>
    )
}
