import Link from 'next/link'
import Image from 'next/image'

import React, { useEffect, useState } from 'react';
import Panel from '@components/Panel/Panel'

import SubjectIcon from '@mui/icons-material/Subject';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import BallotIcon from '@mui/icons-material/Ballot';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TocIcon from '@mui/icons-material/Toc';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ETHIcon from '@img/main/ETH.svg';

import { useDispatch, useSelector } from 'react-redux';
import { selectAccount, selectIsAuth } from '@src/store/user/userSlice';
import { getNFTInfo, getNFTActivity } from '@src/API/nft';

import NFTView from './components/NFTView'
import SaleModal from './components/SaleModal';
import MintModal from './components/MintModal';
import BuyModal from './components/BuyModal';
import MakeOfferModal from './components/MakeOfferModal';

import { toast } from 'react-hot-toast';
import { sliceText } from '@src/helpers/Common';
import useWallet from '@src/hooks/useWallet';
import MoreFromCollection from './components/MoreFromCollection';
import ItemActivity from './components/ItemActivity';
import Offers from './components/Offers';
import Listing from './components/Listing';
import { reset } from '@src/store/nft/nftSlice';
import Loader from '@components/Common/Loader';


export default function NFTPage({ id }) {

    const [nft, setNft] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isOpenModalMint, setIsOpenModalMint] = useState(false)
    const [isOpenModalBuy, setIsOpenModalBuy] = useState(false)
    const [isOpenModalMakeOffer, setIsOpenModalMakeOffer] = useState(false)
    const [isOpenModalSale, setIsOpenModalSale] = useState(false)
    const account = useSelector(selectAccount);
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth);
    const [activity, setActivity] = useState([])

    useEffect(() => {
        return (() => dispatch(reset()))
    }, [])

    useEffect(() => {
        if (id)
            getDataAPI()
    }, [id])

    const getDataAPI = async () => {
        let nftData = await getNFTInfo({ id }).then(resp => resp.data)

        setNft(nftData)
        setIsLoading(false)
        if (nftData.tokenId) {
            const activities = await getNFTActivity({ tokenId: nftData.tokenId }).then(resp => resp.data)
            setActivity([...activities])
        }
    }

    const onClickMint = async () => setIsOpenModalMint(!isOpenModalMint)
    const onClickBuy = async () => setIsOpenModalBuy(!isOpenModalBuy)
    const onClickMakeOffer = async () => setIsOpenModalMakeOffer(!isOpenModalMakeOffer)
    const onClickSale = () => setIsOpenModalSale(!isOpenModalSale)

    const Description = () => {
        return <div className='description'>
            {nft.description && <div className='description__info'>
                <div className='description__info__header'>
                    <div className='header__left'>
                        <SubjectIcon />
                        <span>Description</span>
                    </div>
                    <div className='header__right'></div>
                </div>
                <div className='description__info__body'>
                    {nft.description}
                </div>
            </div>}
            <Panel className='description__about' icon={<VerticalSplitIcon />} name={`About ${nft.collection?.name}`}>
                <Link href={{ pathname: '/account/[wallet]', query: { wallet: nft.owner?.wallet } }}>
                    <div className='description__about__creator'>
                        By <span>{nft.creator?.username}</span>
                    </div>
                </Link>
                <div className='aboutImage'>
                    <Image alt="" width={50} height={50} src={nft.collection?.collectionImg} />
                </div>
                <div className='aboutDesc'>
                    {nft.collection?.description}
                </div>
            </Panel>

            <Panel className='description__details' icon={<BallotIcon />} name='Details'>
                {nft.contract && <div className='description__details__row'>
                    <div>Contract Address</div>
                    <div>
                        <a target="_blank" href={`https://goerli.etherscan.io/address/${nft.contract}`}>
                            {sliceText(nft.contract, 6, '...')}
                        </a>
                    </div>
                </div>}
                {nft.tokenId && <div className='description__details__row'>
                    <div>Token ID</div>
                    <div>{nft.tokenId}</div>
                </div>}
                <div className='description__details__row'>
                    <div>Token Standard</div>
                    <div>ERC-721</div>
                </div>
                <div className='description__details__row'>
                    <div>Chain</div>
                    <div>Ethereum</div>
                </div>
                <div className='description__details__row'>
                    <div>Metadata</div>
                    <div>Centralized</div>
                </div>
                <div className='description__details__row'>
                    <div>Creator Fee</div>
                    <div>{nft.creatorFee} %</div>
                </div>
            </Panel>
        </div>
    }

    const NftNavbar = () => {
        return (
            isAuth && account.id === nft.ownerId && < div className='nftPage__navbar' >
                <Link href={{ pathname: '/assets/[id]/edit', query: { id } }}>
                    <button className='btn btn-blue' type='submit'>Edit</button>
                </Link>
                {nft.status === 'CREATED' && <button onClick={onClickMint} className='btn btn-blue' type='submit'>Mint</button>}
                {(nft.status === 'MINTED' || nft.status === 'BOUGHT') && <button onClick={onClickSale} className='btn btn-blue' type='submit'>Sale</button>}
            </div >
        )
    }

    const PriceView = () => {
        return (
            isAuth && nft.tokenId && nft.status === 'SALE' && <div className='nftPage__right__info__panelSale'>
                <div className='price'>
                    <div>
                        <h3 className='price__title'>Current price</h3>
                        <h2 className='price__subTitle'>
                            <ETHIcon />
                            {nft.price} ETH
                        </h2>
                    </div>
                    <div className='price__btn-group'>
                        {nft.ownerId !== account.id &&
                            <button className='btn btn-blue' onClick={onClickBuy} type='submit' >Buy</button>
                        }
                        {nft.ownerId !== account.id &&
                            <button className='btn btn-white' onClick={onClickMakeOffer} type='submit' >Make offer</button>
                        }
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) return <Loader />

    return (
        <div className='nftPage'>
            <NftNavbar />
            <div className='nftPage__left'>
                <NFTView nft={nft} />
                <Description />
            </div>
            <div className='nftPage__right'>
                <div className='nftPage__right__info'>
                    <header className='nftPage__right__info__header'>
                        <Link className='subtitle' href={{ pathname: '/collection/[customUrl]', query: { customUrl: nft.collection?.customUrl } }}>
                            {nft.collection?.name}
                        </Link>
                        <div className='title'>
                            <h1>{nft.name}</h1>
                        </div>
                    </header>
                    <Link className='nftPage__right__info__owner' href={{ pathname: '/account/[wallet]', query: { wallet: nft.owner?.wallet } }}>
                        <div>
                            Owned by <span>{nft.owner?.username}</span>
                        </div>
                    </Link>
                    <PriceView />
                    <Panel icon={<LocalOfferIcon />} name='Listings'>
                        <Listing nft={nft} />
                    </Panel>
                    <Panel icon={<TocIcon />} name='Offers'>
                        <Offers nft={nft} />
                    </Panel>
                </div>
            </div>
            <div className='nftPage__bottom'>
                <Panel className={'itemActivity'} icon={<SwapVertIcon />} name='Item Activity'>
                    <ItemActivity activity={activity} />
                </Panel>
                <Panel isOpen={true} icon={<ViewModuleIcon />} name='More from this collection'>
                    <MoreFromCollection nfts={nft.moreFromCollection} />
                </Panel>
            </div>
            <SaleModal
                nft={nft}
                isOpen={isOpenModalSale}
                onSuccess={() => {
                    getDataAPI().then(() => {
                        toast.success('You put up for sale nft')
                        setIsOpenModalSale(false)
                    })
                }}
            />
            <MintModal
                nft={nft}
                isOpen={isOpenModalMint}
                onSuccess={() => {
                    getDataAPI().then(() => {
                        toast.success('You minted nft')
                        setIsOpenModalMint(false)
                    })
                }}
            />
            <BuyModal
                nft={nft}
                isOpen={isOpenModalBuy}
                onSuccess={() => {
                    getDataAPI().then(() => {
                        toast.success('You bought nft')
                        setIsOpenModalBuy(false)
                    })
                }}
            />
            <MakeOfferModal
                nft={nft}
                isOpen={isOpenModalMakeOffer}
                onSuccess={() => {
                    getDataAPI().then(() => {
                        setIsOpenModalMakeOffer(false)
                    })
                }}
            />
        </div>
    )
}