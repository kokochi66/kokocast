import React, {ReactNode} from 'react';

interface AuthInputProps {
    title: string;
    type: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ title, type}) => {
    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" placeholder={title}/>
            <label htmlFor="floatingInputNickname">{title}</label>
        </div>
    );
};

export default AuthInput;