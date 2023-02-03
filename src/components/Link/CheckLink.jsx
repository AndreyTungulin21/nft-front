import Link from 'next/link'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function MyLink({ className, children, errorMessage, href, handleClick }) {
    const router = useRouter()

    return (
        <a className={className} onClick={() => {
            if (handleClick) {
                router.push(href)
            } else toast.error(errorMessage)
        }} >
            {children}
        </a>
    )
}
