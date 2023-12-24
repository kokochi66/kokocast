import User from '../../models/User.js'
import Channel from '../../models/Channel.js'
import axios from 'axios'

export const getChannelDetails = async (req, res) => {
    try {
        const { channelId } = req.params
        const channel = await Channel.findById(channelId)

        if (!channel || !channel.isActive) {
            return res.status(404).send('Channel not found')
        }

        const user = await User.findOne({ channel: channelId }, { username: 1 })

        const streamUrl = `http://localhost:8000/live/${channel.streamKey}.flv`
        const activeStreamsResponseData = await axios.get('http://localhost:8000/api/streams')
        let liveStreams = []
        if (activeStreamsResponseData.data) {
            const activeStreams = activeStreamsResponseData.data
            for (const streamId in activeStreams.live) {
                if (activeStreams.live[streamId].publisher && activeStreams.live[streamId].publisher !== null) {
                    // 해당 스트리머가 스트리밍이 진행중인지 아닌지 여부를 확인합니다.
                    liveStreams.push(streamId)
                }
            }
    
        }
        const isOnline = liveStreams.includes(channel.streamKey)

        return res.status(200).json({
            id: channel._id,
            title: channel.title,
            description: channel.description,
            username: user.username,
            isOnline: isOnline,
            streamUrl
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Channel not found, Please check you channel url.')
    }
}