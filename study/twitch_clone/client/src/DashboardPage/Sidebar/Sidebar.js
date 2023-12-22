import React from 'react'

const follwedChannels = [
    {
        id: 1,
        username: 'Leechunhyang',
        isOnline: false
    },
    {
        id: 2,
        username: 'Bbonge',
        isOnline: true
    },
    {
        id: 3,
        username: 'gambler',
        isOnline: false
    }
]

export const Sidebar = () => {
    return (
        <div className='sidebar-container'>
            <span className='sidebar-title'>For you</span>
            <span className='sidebar-subtitle'>FOLLWED CHANNELS</span>
            {follwedChannels.map(channel => {
                return (
                    <div key={channel.id} className='sidebar-list-item'>
                        <span className='sidebar-list-username'>{channel.username}</span>
                        <span
                            className='sidebar-list-status'
                            style={{
                                color: channel.isOnline ? 'green' : 'red'
                            }}
                        >{channel.isOnline ? "Online" : "Offline"}</span>
                    </div>
                )
            })}
        </div>
    )
}
