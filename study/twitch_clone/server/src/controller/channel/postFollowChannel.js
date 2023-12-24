import User from '../../models/User.js'
import Channel from '../../models/Channel.js'

export const postFollowChannel = async (req, res) => {
    try {

        const { userId } = req.user
        const { channelId } = req.body

        const userData = await User.findById(userId, { followedChannels: 1})


        if (userData.followedChannels.includes(channelId)) {
            // 이미 팔로우한 유저를 다시 팔로우 할 수 없음
            return res.status(400).send('You are already following this channel')
        }

        userData.followedChannels.push(channelId)

        await userData.save()

        return res.status(200).send('Channel followed successfully')

    } catch (err) {
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
}