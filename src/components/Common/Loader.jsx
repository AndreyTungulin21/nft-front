import React from 'react'
import HashLoader from "react-spinners/HashLoader";

export default function Loader() {
    return (
        <div className="loader">
            <div className="loader__load">
                <HashLoader color={'#2081e2'} />
            </div>
        </div>
    )
}
