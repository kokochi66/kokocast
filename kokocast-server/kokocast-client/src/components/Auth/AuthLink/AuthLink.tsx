import React from 'react';

interface AuthInputProps {
    leftLink: string;
    leftName: string;
    rightLink: string;
    rightName: string;
}

const AuthLink: React.FC<AuthInputProps> = (
    {
        leftLink,
        leftName,
        rightLink,
        rightName
    }) => {
    return (
        <div className="d-flex justify-content-between">
            <a href={leftLink} className="auth-page-link">{leftName}</a>
            <a href={rightLink} className="auth-page-link">{rightName}</a>
        </div>
    );
};

export default AuthLink;