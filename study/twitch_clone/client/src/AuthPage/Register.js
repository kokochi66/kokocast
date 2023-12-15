import React, { useState } from "react"
import { Logo } from "./Logo"
import { AuthInput } from "./AutInput"
import { emailValidationMessage, passwordConfValidationMessage, passwordValidationMessage, usernameValidationMessage, validateEmail, validatePassword, validatePasswordConf, validateUsername } from "../shared/validators"
import { useRegister } from "../shared/hooks"

export const Register = ({ switchAuthHandler }) => {
    const { isLoading, register } = useRegister()

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
        username: {
            value: '',
            isValid: false,
            showError: false,
        },
        passwordConf: {
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
            case 'username':
                isValid = validateUsername(value)
                break
            case 'passwordConf':
                isValid = validatePasswordConf(formState.password.value, value)
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

    const handleRegister = (event) => {
        event.preventDefault()

        register(formState.email.value, formState.password.value, formState.username.value)

    }

    const isSubmitButtonDisabled = !formState.password.isValid
        || !formState.passwordConf.isValid
        || !formState.username.isValid
        || !formState.email.isValid
        || formState.password.value !== formState.passwordConf.value
        || isLoading

    return <div className="register-container">
        <Logo text={"Sign in to Clone"} />
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
                field="username"
                label="Username"
                type='text'
                value={formState.username.value}
                onChangeHandler={handleInputValueChange}
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState.username.showError}
                validationMessage={usernameValidationMessage}
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
            <AuthInput
                field="passwordConf"
                label="Password Confirmation"
                type='password'
                value={formState.passwordConf.value}
                onChangeHandler={handleInputValueChange}
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState.passwordConf.showError}
                validationMessage={passwordConfValidationMessage}
            />
            <button
                onClick={handleRegister}
                disabled={isSubmitButtonDisabled}>Register</button>
        </form>
        <span onClick={switchAuthHandler} className="auth-form-switch-label">
            Already have an account ? Sign in
        </span>
    </div>
}