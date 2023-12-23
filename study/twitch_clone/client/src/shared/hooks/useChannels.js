import { useEffect, useState } from "react"
import { getFollowedChannels as getFollowedChannelsRequest,
getChannels as getChannelsRequest } from "../../api"
import toast from "react-hot-toast"

export const useChannels = () => {
    const [channels, setChannels] = useState(null)
    
    const getChannels = async (isLogged = false) => {
        const channelData = await getChannelsRequest()

        if (channelData.error) {
            return toast.error(
                channelData.exception?.response.data
                || 'Error occured when fetching the channels'
            )
        }
        
        if (!isLogged) {
            return setChannels({
                channels: channelData.data.channels,
            })
        }

        const followedChannelsData = await getFollowedChannelsRequest()
        if (followedChannelsData.error) {
            return toast.error(
                channelData.exception?.response.data
                || 'Error occured when fetching the followed channels'
            )
        }

        setChannels({
            channels: channelData.data.channels,
            followedChannels: channelData.data.channels
            .filter(ch => followedChannelsData.data.followedChannels.includes(ch.id)),
        })
    }

    return {
        getChannels,
        isFetching: Boolean(!channels),
        allChannels: channels?.channels,
        followedChannels: channels?.followedChannels,
    }
}