import ModalWallets from '@components/ModalConnectWallets/ModalWallets'
import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toogleSidebar } from '@src/store/info/infoSlice';
import { selectIsAuth, selectAccount } from '@src/store/user/userSlice';
import { sliceText } from '@src/helpers/Common';

import ETHIcon from '@img/main/ETH.svg';
import Image from 'next/image';
import { useState } from 'react';
import { getBalanceUser } from '@src/API/user';
import { useEffect } from 'react';
import { useOutsideClick } from '@src/hooks/useOutsideClick';

export default function Sidebar() {
    const isOpenSidebar = useSelector(state => state.defaultVariable.isOpenSidebar)
    const isAuth = useSelector(selectIsAuth);
    const account = useSelector(selectAccount);
    const refSidebar = useRef();
    const dispatch = useDispatch()

    useOutsideClick(refSidebar, () => {
        if (isOpenSidebar) dispatch(toogleSidebar())
    })

    const [userBalance, setUserBalance] = useState({
        balance: '0'
    })

    useEffect(() => {
        if (account.wallet) {
            getBalanceUser({ wallet: account.wallet }).then((resp) => {
                setUserBalance(resp)
            })
        }
    }, [account])

    return (
        <div ref={refSidebar} className={`sidebar ${isOpenSidebar ? 'open' : ""}`}>
            <div className='sidebar__title'>
                <div className='sidebar__title__bar'>
                    <div className='icon'>
                        {isAuth && account.profileImg && <Image alt="" src={account.profileImg} width={30} height={30} />}
                        {!isAuth && <AccountCircleIcon />}
                        <span>My wallet</span>
                    </div>
                </div>

                {isAuth && <div className='sidebar__title__info'>
                    <ETHIcon /> {sliceText(account?.wallet, 4, '...')}
                </div>}
            </div>
            {!isAuth && <div className='sidebar__body'>
                <div className='info'>
                    If you don't have a wallet yet, you can select a provider and create one now.
                </div>
                <ModalWallets />
            </div>}

            {isAuth && <div className='sidebar__body totalBalance'>
                <div className='info'>
                    <div className='info__title'>Total balance</div>
                    <div className='info__eth'><ETHIcon /> {userBalance.balance?.eth ? userBalance.balance?.eth?.slice(0, 6) : 0} ETH</div>
                    <div className='info__usd'>$ {userBalance.balance?.usd ? userBalance.balance?.usd : 0} USD</div>
                </div>
            </div>}

        </div>
    )
}
