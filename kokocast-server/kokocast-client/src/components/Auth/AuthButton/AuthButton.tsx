import React from 'react';

interface AuthButtonProps {
    buttonName: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ buttonName }) => {
    return (
        <button type="submit" className="btn btn-primary w-100 mb-3 auth-page-button">
            {buttonName}
        </button>
    );
};

export default AuthButton;