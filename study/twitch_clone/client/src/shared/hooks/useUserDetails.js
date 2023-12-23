import { useState } from "react"
import { logout as logoutHandler } from "../utils"

const getUserDetails = () => {
    const userDetails = localStorage.getItem('user')
    if (userDetails) {
        return JSON.parse(userDetails)
    }
    return null
}

export const useUserDetails = () => {
    const [userDetails, setUserDetails] = useState(getUserDetails())

    const logout = () => {
        // 로그아웃 로직
        logoutHandler()
    }

    return {
        isLogged: Boolean(userDetails),
        username: userDetails?.username ? userDetails.username : 'Guest',
        logout,
    }
}