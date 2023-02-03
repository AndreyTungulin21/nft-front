import moment from 'moment/moment';
import React from 'react'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import NoHistoryData from '@components/NoHistoryData/NoHistoryData';

export default function Activity({ collection }) {

  const dateFormatter = date => {
    return moment(date).format('DD.MM');
  };

  const Chart = () => {
    return (
      <div className='activity__chart'>
        <LineChart width={900} height={300} data={collection.activity?.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="count" strokeWidth={2} dot={{ stroke: '#2081e2', strokeWidth: 2, r: 4 }} stroke="#2081e2" />
          <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={'created'} tickFormatter={dateFormatter} tickLine={false} />
          <YAxis allowDecimals={false} tickLine={false} />
        </LineChart>
      </div>
    )
  }

  if (collection.activity?.data?.length === 0) {
    return <div className='activity__empty'>
      <NoHistoryData />
    </div>
  }


  return (
    <div className='activity'>
      <Chart />
    </div>
  )
}
