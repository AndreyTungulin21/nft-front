import React from 'react'

export default function TabsContent({ tabs, activeTab, onClickTab }) {
    return (
        <ul className='tabsContent'>
            {tabs.map((item, i) => {
                return <li key={i} onClick={() => onClickTab(item)} className={`tab ${activeTab.name === item.name ? 'active' : ''}`}>{item.name}</li>
            })}
        </ul>
    )
}
