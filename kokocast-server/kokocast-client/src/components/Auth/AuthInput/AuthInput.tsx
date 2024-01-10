import React, {ReactNode} from 'react';

interface AuthInputProps {
    title: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 새로 추가
}

const AuthInput: React.FC<AuthInputProps> = ({ title, type, onChange}) => {
    return (
        <div className="form-floating mb-3">
            <input type={type} className="form-control" placeholder={title} onChange={onChange}/>
            <label htmlFor="floatingInputNickname">{title}</label>
        </div>
    );
};

export default AuthInput;