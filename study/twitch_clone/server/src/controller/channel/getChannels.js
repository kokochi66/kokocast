import User from '../../models/User.js'
import axios from 'axios'
import Channel from '../../models/Channel.js'

export const getChannels = async (_, res) => {
    try {
        // 모든 채널들을 조회함.
        // limit을 지정해놔야 할듯.
        const users = await User.find({}, {
            channel: 1,
            username: 1,
        }).populate('channel')
        
        // active 상태인 채널만을 가져옴.
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

        const channels = users
            .filter(u => u.channel.isActive)
            .map(u => {
                return {
                    id: u.channel._id,
                    title: u.channel.title,
                    avatarUrl: u.channel.avatarUrl,
                    username: u.username,
                    isOnline: liveStreams.includes(u.channel.streamKey),
                }
            })
        return res.json({
            channels,
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
    return res.json({})
}