import React from 'react'
import logo from '../../resources/images/logoPlaceholder.svg'
import { useUserDetails } from '../../shared/hooks'
import { useNavigate } from 'react-router-dom'


const NavLogo = () => {
    return (
        <div className='nav-logo-container'>
            <img className='nav-log' width='100%' height='100%' src={logo} />
        </div>
    )
}

const NavButton = ({ text, onClickHandler }) => {
    return (
        <span className='nav-button' onClick={onClickHandler}>
            {text}
        </span>
    )
}

export const Nav = () => {
    const { isLogged, logout } = useUserDetails()
    const navigate = useNavigate()

    const handleNavigateToAuthPage = () => {
        navigate('/auth')
    }
    const handleNavigateToSettingsPage = () => {
        navigate('/settings')
    }
    const handleNavigateToChannels = () => {
        navigate('/channels')
    }


    const handleLogout = () => {
        logout()
    }
    return (
        <div className='nav-container'>
            <NavLogo />
            <div className='nav-buttons-container' >
                <NavButton text='Browse' onClickHandler={handleNavigateToChannels} />
                {!isLogged ? (
                    <NavButton text='Login' onClickHandler={handleNavigateToAuthPage} />
                ) : (
                    <div>
                        < NavButton text='My Account' onClickHandler={handleNavigateToSettingsPage} />
                        <NavButton text='Logout' onClickHandler={handleLogout} />
                    </div>
                )}
            </div>
        </div >
    )
}
