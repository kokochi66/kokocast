import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid'

const { Schema } = mongoose

const defaultTitle = "New Channel"
const defaultDescription = "This is new channel description"

const channelSchema = new Schema({
    isActive: { type: Boolean, default: false},
    title: { type: String, default: defaultTitle },
    description: { type: String, default: defaultDescription },
    avatarUrl: { type:String, default: 'none' },
    streamKey: { type: String, default: uuid}, // RTMP 서버와 연결할 스트림 키
    messages: {
        type: [{ type: Schema.Types.ObjectId, ref: "Message"}],
        default: [],
    }
})

export default mongoose.model('Channel', channelSchema)