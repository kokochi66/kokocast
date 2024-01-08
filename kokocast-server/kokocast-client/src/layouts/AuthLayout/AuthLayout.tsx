import React, {ReactNode} from 'react';
import MainLayout from "../MainLayout";
import './AuthLayout.css'

interface AuthLayoutProps {
    children: ReactNode; // ReactNode 타입으로 children을 정의합니다.
    title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children, title}) => {
    return (
        <MainLayout>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="auth-page-container p-4">
                    <h2 className="auth-page-title text-center">{title}</h2>
                    <form className="auth-page-form">
                        {children}
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default AuthLayout;