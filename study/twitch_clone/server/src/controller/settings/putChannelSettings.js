import User from '../../models/User.js'
import Channel from '../../models/Channel.js'

export const putChannelSettings = async (req, res) => {
    try {
        const { userId } = req.user

        const { title, description, username, avatarUrl } = req.body

        console.log('avatarUrl = ', avatarUrl)

        const userData = await User.findById(userId, {channel: 1, username: 1})

        if (userData.username !== username) {
            await User.updateOne({ _id: userId}, { username })
        }

        const channelData = await Channel.findByIdAndUpdate(userData.channel, {
            title,
            description,
            avatarUrl,
            isActive: true,

        }, { new: true})

        return res.status(200).json({
            channelId: channelData._id,
            username,
            title: channelData.title,
            description: channelData.description,
            avatarUrl: channelData.avatarUrl,
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
}