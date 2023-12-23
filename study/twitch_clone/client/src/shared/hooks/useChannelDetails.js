import { useEffect, useState } from "react"
import { getChannelDetails as getChannelDetailsRequest} from "../../api"
import toast from "react-hot-toast"

export const useChannelDetails = () => {
    const [channelDetails, setChannelDetails] = useState(null)

    const getChannelDetails = async (id) => {
        const responseData = await getChannelDetailsRequest(id)

        if (responseData.error) {
            console.log(responseData)
            return toast.error(
                responseData.exception?.response.data
                || 'Error occured when fetching the channels details'
            )
        }
        setChannelDetails(responseData.data)
    }

    return {
        channelDetails,
        isFetching: Boolean(!channelDetails),
        getChannelDetails,
    }

}