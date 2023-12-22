import React from 'react'
import { Chat } from './Chat'
import { ChannelDescription } from './ChannelDescription'

const dummyChannels = {
    id: 1,
    title: "자낳대 준비",
    description: '리그 오브 레전드',
    username: "Bbonge",
    isOnline: true,
}

export const ChannelView = () => {
    return (
        <div className='channel-container'>
            <div className='channel-video-description-section'>
                <div className='channel-offline-placeholder'>
                    <span>Channel is offline</span>
                </div>
                <ChannelDescription
                    channelId={dummyChannels.id}
                    title={dummyChannels.title}
                    description={dummyChannels.description}
                    username={dummyChannels.username}
                    
                />
            </div>
            <Chat />
        </div>
    )
}
