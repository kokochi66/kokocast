import React from 'react'
import { ChannelCard } from './ChannelCard'

export const dummyChannels = [
    {
        id: 1,
        title: '공겜동',
        avatarUrl: null,
        username: "이춘향",
        isOnline: true,
    },
    {
        id: 2,
        title: '공겜동',
        avatarUrl: null,
        username: "김뚜띠",
        isOnline: false,
    },
    {
        id: 3,
        title: '공겜동',
        avatarUrl: null,
        username: "탬탬버린",
        isOnline: true,
    },
    {
        id: 4,
        title: '공겜동',
        avatarUrl: null,
        username: "나나양",
        isOnline: false,
    }
]

export const Channels = () => {
    return (
        <div className='channels-container'>
            {
                dummyChannels.map( c => (
                    <ChannelCard
                        key={c.id}
                        title={c.title}
                        username={c.username}
                        isOnline={c.isOnline}
                        avatarUrl={c.avatarUrl}
                        navigateToChannelHandler={() => {

                        }}
                    />
                ))
            }
        </div>
    )
}
