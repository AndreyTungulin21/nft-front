import React from 'react'
import ModalWallets from '@components/ModalConnectWallets/ModalWallets'

export default function Login() {
    return (
        <div className='login'>
            <h1 className='login__title'>
                Connect your wallet.
            </h1>

            <h2 className='login__subTitle'>
                If you don't have a wallet yet, you can select a provider and create one now.
            </h2>
            <div className="login__modalWallets">
                <ModalWallets />
            </div>
        </div>
    )
}