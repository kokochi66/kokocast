import React from 'react'
import { Messages } from './Messages'
import { NewMessageInput } from './NewMessageInput'
import { useChatHistory } from '../../../../shared/hooks'

export const Chat = ({ channelId }) => {
    const { sendMessage, messages } = useChatHistory(channelId) 
    return (
        <div className='chat-section'>
            <div className='chat-title-container'>
                <span className='chat-title-text'>Stream Chat</span>
            </div>

            <Messages messages={messages} />
            <NewMessageInput sendMessage={sendMessage} />
        </div>
    )
}
