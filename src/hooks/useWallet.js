import { useDispatch, useSelector } from "react-redux";
import { setWallet, setWalletStatus, } from '@src/store/user/userSlice';
import { useEffect } from "react";
import { toast } from "react-hot-toast";
const { ethers } = require("ethers");


function useWallet() {
    const wallet = useSelector(state => state.user.wallet);
    const statusWallet = useSelector(state => state.user.statusWallet);
    const dispatch = useDispatch();

    if (typeof window !== "undefined" && window.ethereum) {
        var { ethereum } = window;
        var provider = new ethers.providers.Web3Provider(window.ethereum)
    }

    useEffect(() => {
        checkAccountSession()
    }, [])

    const connectWallet = async () => {
        if (!provider) {
            toast.error('Please install metamask')
            return
        }

        const accounts = await provider.send("eth_requestAccounts");
        dispatch(setWallet(accounts[0]))
        return accounts[0]
    };

    const checkUnlockedWallet = () => {
        return ethereum?._metamask.isUnlocked()
    }

    const checkAccountSession = () => {
        ethereum?.on('accountsChanged', function (accounts) {
            dispatch(setWallet(accounts[0]))
            dispatch(setWalletStatus('accountsChanged'))
            setTimeout(function () {
                dispatch(setWalletStatus(''))
            }, 1000);
        })
    }

    const sendTx = async (tx) => {
        let signer = provider.getSigner();
        let txHash = signer
            .sendTransaction(tx)
            .catch((err) => {
                console.error('err', err);
                toast.error('You rejected transaction')
            })

        return txHash
    }

    const signMessage = async (message) => {
        const signer = provider.getSigner()
        const signature = await signer.signMessage(message)
        return signature
    }

    const disconnectWallet = async () => {
        dispatch(setWallet(''))
    }

    return { connectWallet, wallet, statusWallet, disconnectWallet, checkUnlockedWallet, signMessage, sendTx }
};

export default useWallet