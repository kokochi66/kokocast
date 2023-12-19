import User from '../../models/User.js'
import Channel from '../../models/Channel.js'

export const getFollowedChannels = async (req, res) => {
    try {
        const { userId } = req.user

        const userData = await User.findById(userId, { followedChannels: 1 })

        return res.status(200).json({
            followedChannels: userData.followedChannels
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
    return res.json({})
}