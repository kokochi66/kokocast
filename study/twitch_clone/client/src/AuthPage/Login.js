import React, { useState } from "react"
import { Logo } from "./Logo"
import { AuthInput } from "./AutInput"
import { emailValidationMessage, passwordValidationMessage, validateEmail, validatePassword } from "../shared/validators"
import { useLogin } from "../shared/hooks/useLogin"

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin()

    const [formState, setFormState] = useState({
        email: {
            value: '',
            isValid: false,
            showError: false,
        },
        password: {
            value: '',
            isValid: false,
            showError: false,
        },
    })

    const handleInputValueChange = (value, field) => {
        setFormState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false

        switch (field) {
            case 'email':
                isValid = validateEmail(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            default:
                break
        }
        setFormState(prevState => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            }
        }))
    }

    const handleLogin = (event) => {
        event.preventDefault()

        login(formState.email.value, formState.password.value)
    }

    const isSubmitButtonDisabled = isLoading || !formState.password.isValid || !formState.email.isValid

    return <div className="login-container">
        <Logo text={"Log in to Clone"} />
        <form className="auth-form">
            <AuthInput
                field="email"
                label="Email"
                type='text'
                value={formState.email.value}
                onChangeHandler={handleInputValueChange}
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState.email.showError}
                validationMessage={emailValidationMessage}
            />
            <AuthInput
                field="password"
                label="Password"
                type='password'
                value={formState.password.value}
                onChangeHandler={handleInputValueChange}
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState.password.showError}
                validationMessage={passwordValidationMessage}
            />
            <button
                onClick={handleLogin}
                disabled={isSubmitButtonDisabled}
            >Log in</button>
        </form>
        <span onClick={switchAuthHandler} className="auth-form-switch-label">
            Don't have an account ? Sign up
        </span>
    </div>
}