import React, { useState } from 'react';

export const NewMessageInput = ({ sendMessage }) => {
    const [messageContent, setMessageContent] = useState('')

    const handlerValueChange = (e) => {
        setMessageContent(e.target.value)
    }

    const handleSendMessage = () => {
        // 서버로 메세지 보내기
        if (messageContent.length > 0) {
            sendMessage(messageContent)
            
        // 메세지를 보낸 후 값을 비워준다.
        setMessageContent('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    return (
        <div className='chat-message-input-container'>
            <input
                className='chat-message-input'
                placeholder='Type message ...'
                value={messageContent}
                onChange={handlerValueChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};