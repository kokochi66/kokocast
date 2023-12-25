import io from 'socket.io-client'
import { useStore } from '../store/store';

let socket;

export const connectWithSocketServer = () => {
    socket = io('http://localhost:5002')

    socket.on('connection', () => {
        console.log('successfully connected with socket.io server')
        console.log(socket.id)
    })

    socket.on('chat-history', (chatHistory) => {
        const { setChatHistory } = useStore.getState()
        setChatHistory(chatHistory)
    })

    socket.on('chat-message', (chatMessage) => {
        const { chatHistory, setChatHistory } = useStore.getState()
        setChatHistory({
            channelId: chatHistory.channelId,
            messages: [
                ...chatHistory.messages,
                {
                    author: chatMessage.author,
                    content: chatMessage.content,
                }
            ],
        })
    })
}

export const getChatHistory = (channelId) => {
    // 채널 Id로 채팅 내역 정보를 가져온다. (db에 저장되어 있는 값을 가져옴) 
    socket.emit('chat-history', channelId)
}

export const sendChatMessage = (toChannel, messageData) => {
    socket.emit('chat-message', {
        toChannel,
        messageData
    })
}

export const closeChatSubscription = (channelId) => {
    socket.emit('chat-unsubscribe', channelId)
}