import Channel from "../../models/Channel.js"
import Message from "../../models/Message.js"

export const emitChatMessage = async (io, messageData) => {
    try {
        const channel = await Channel.findById(messageData.toChannel)

        if (channel) {
            console.log(messageData)
            const newMessage = new Message({
                content: messageData.message.content,
                author: messageData.message.author,
                date: new Date()
            })

            await newMessage.save()
            channel.messages.push(newMessage._id)
            await channel.save()
            
            io.to(messageData.toChannel).emit('chat-message', newMessage)
        }

    } catch (err) {
        console.log(err)

    }
}