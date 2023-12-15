import mongoose from 'mongoose'

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    // 사용자마다 하나의 채널을 기본적으로 갖고있다.
    channel: { type: Schema.Types.ObjectId, ref: 'Channel'},
    // 사용자마다 여러개의 팔로우 채널을 갖고있다.
    followedChannels: { type: [{type: Schema.Types.ObjectId, ref: 'Channel'}]}
})

export default mongoose.model('User', userSchema)