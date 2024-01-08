import React from 'react';
import './LoginPage.css';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";
import AuthLink from "../../../components/Auth/AuthLink"; // 추가적인 스타일을 위한 CSS 파일

const Login = () => {
    return (
        <AuthLayout title="Login">
            <AuthInput title="Nickname" type="text" />
            <AuthInput title="Password" type="password" />
            <AuthButton buttonName="로그인" />
            <AuthLink
                leftLink="/register"
                leftName="회원가입"
                rightLink="/find-password"
                rightName="비밀번호 찾기"
                />
        </AuthLayout>
    );
};

export default Login;
