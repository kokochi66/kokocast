import { Server } from "socket.io";
import { emitChatHistory } from "./events/chatHistory.js";
import { emitChatMessage } from "./events/chatMessage.js";

let io;

export const registerSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    })

    io.on('connection', (socket) => {

        // 딱 페이지에 들어갔을 때 채팅을 처음부터 보여주는게 아니라 그 전의 채팅내용을 보여주기 위한 history 저장
        socket.on('chat-history', (channelId) => {
            socket.join(channelId)
            emitChatHistory(socket, channelId)
        })

        socket.on('chat-message', (data) => {
            emitChatMessage(io, { toChannel: data.toChannel, message: data.messageData })
        })

        socket.on('chat-unsubscribe', (channelId) => {
            // 비구독자 채팅
            socket.leave(channelId)
        })
    })
}