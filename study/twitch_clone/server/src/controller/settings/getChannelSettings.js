import User from '../../models/User.js'

export const getChannelSettings = async (req, res) => {
    try {
        const { userId } = req.user

        const userData = await User.findById(userId, {
            // projection => 특정 필드만 결과에 포함시키기 위한 동작
            // 1은 해당 필드를 결과에 포함해야한다는 뜻이고, 0은 제외한다는 뜻이다.
            channel: 1,
            username: 1,

        }).populate('channel')  // channel 데이터도 DB에서 가져오기 위한 동작

        return res.status(200).json({
            id: userData.channel._id,
            username: userData.username,
            title: userData.channel.title,
            description: userData.channel.description,
            avatarUrl: userData.channel.avatarUrl,
            streamKey: userData.channel.streamKey,
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
}