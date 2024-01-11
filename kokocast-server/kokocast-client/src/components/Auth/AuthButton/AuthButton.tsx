import React from 'react';

interface AuthButtonProps {
    buttonName: string;
    onClick: () => void; // 함수 타입을 추가합니다.
}

const AuthButton: React.FC<AuthButtonProps> = ({ buttonName, onClick }) => {
    return (
        <button
            type="button"
            className="btn w-100 mb-3 auth-page-button"
            onClick={onClick} // 여기에 onClick 이벤트 핸들러를 추가합니다.
        >
            {buttonName}
        </button>
    );
};

export default AuthButton;
