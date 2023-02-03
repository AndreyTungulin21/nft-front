import React from 'react'
import NoHistoryDataIcon from '@public/img/main/noHistoryData.svg?jsx'

export default function NoHistoryData({ style }) {
    return (
        <div style={style} className='noHistoryData'>
            <div className='noHistoryData__wrap'>
                <NoHistoryDataIcon />
                <span>No history data</span>
            </div>

        </div>
    )
}
