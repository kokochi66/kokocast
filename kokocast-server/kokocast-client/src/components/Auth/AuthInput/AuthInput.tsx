import React from 'react';

interface AuthInputProps {
    title: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AuthInput: React.FC<AuthInputProps> = ({ title, type, onChange, onKeyDown }) => {
    return (
        <div className="form-floating mb-3">
            <input type={type}
                   className="form-control"
                   placeholder={title}
                   onChange={onChange}
                   onKeyDown={onKeyDown} // 선택적으로 적용되는 이벤트 핸들러
            />
            <label htmlFor="floatingInputNickname">{title}</label>
        </div>
    );
};

export default AuthInput;
