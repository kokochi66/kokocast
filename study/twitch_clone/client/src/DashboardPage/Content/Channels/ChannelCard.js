import React from 'react'

const imageUrl = 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg'

const ChannelAvatar = ({ url }) => {
    return (
        <div className='channels-avatar-container'>
            <img src={url || imageUrl} width='100%' height='100%' />
        </div>
    )
}

export const ChannelCard = ({
    title,
    id,
    username,
    isOnline,
    avatarUrl,
    navigateToChannelHandler,
}) => {

    const handleNavigate = () => {
        navigateToChannelHandler(id)
    }

    return <div className='channels-card' onClick={handleNavigate}>
        <ChannelAvatar url={avatarUrl} />
        <span className='channels-card-title'>{title}</span>
        <span className='channels-card-text'>{username}</span>
        <span className='channels-card-text'
            style={{
                color: isOnline ? 'green' : 'red'

            }}
        >{isOnline ? 'Online' : 'Offline'}</span>
    </div>
}