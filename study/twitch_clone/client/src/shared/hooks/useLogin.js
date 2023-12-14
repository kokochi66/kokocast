import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginRequest } from '../../api'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)
        const response = await loginRequest({
            email,
            password
        })

        console.log('res = ', response)

        setIsLoading(false)

        if (response.error) {
            return console.log(response.error)
        }

        const { userDetails } = response.data
        localStorage.setItem('user', userDetails)

        navigate('/')
    }

    return {
        login,
        isLoading,
    }
}