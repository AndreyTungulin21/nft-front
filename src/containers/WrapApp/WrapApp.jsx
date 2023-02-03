import { signOut, useSession } from "next-auth/react"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { connecterUser, reset } from '@src/store/user/userSlice'
import { setMainInfo } from '@src/store/info/infoSlice'
import useWallet from '@src/hooks/useWallet'
import { useRouter } from 'next/router'
import { getHome } from "@src/API/main";
import { toast } from 'react-hot-toast'

export default function WrapApp({ children }) {

    const { data, status } = useSession()
    const { statusWallet, checkUnlockedWallet } = useWallet()
    const router = useRouter()

    const dispatch = useDispatch()

    const checkIsUnlockWallet = async () => {
        const isUnlock = await checkUnlockedWallet()
        if (!isUnlock) {
            toast.error('Please unlock your wallet')
            dispatch(reset())
            localStorage.clear('Authorization')
            signOut({ redirect: false })
        }
    }

    useEffect(() => {
        getHome().then(resp => {
            dispatch(setMainInfo(resp))
        })
    }, [])

    useEffect(() => {

        if (status === 'authenticated') {
            checkIsUnlockWallet()
        }

        switch (status) {
            case 'authenticated':
                localStorage.setItem('Authorization', data.accessToken)
                dispatch(connecterUser({ wallet: data.wallet }))
                break;
            case 'unauthenticated':
                localStorage.clear('Authorization')
                break;
        }
    }, [status])

    useEffect(() => {
        if (status === 'authenticated' &&
            statusWallet === 'accountsChanged') {
            localStorage.clear('Authorization')
            dispatch(reset())
            signOut({ redirect: false })
        }

    }, [statusWallet])

    return (
        children
    )
}
