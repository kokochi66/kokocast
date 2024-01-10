import React, {useState} from 'react';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";
import AuthLink from "../../../components/Auth/AuthLink";
import axios from "axios";
import {useAuth} from "../../../context/Auth/AuthContext"; // 추가적인 스타일을 위한 CSS 파일

const LoginPage = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = () => {
        axios.post('/user/login', {
            nickname,
            password
        }).then(res => {
            // 로그인 처리
            console.log('res = ', res);
            login()
        }).catch(error => {
            // 오류 처리
            if (error.response.data) {
                alert(error.response.data.message);
            }
        });
    };

    return (
        <AuthLayout title="Login">
            <AuthInput
                title="Nickname"
                type="text"
                onChange={(e) => setNickname(e.target.value)}
            />
            <AuthInput
                title="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <AuthButton
                buttonName="로그인"
                onClick={handleLogin}
            />
            <AuthLink
                leftLink="/auth/register"
                leftName="회원가입"
                rightLink="/auth/find-password"
                rightName="비밀번호 찾기"
                />
        </AuthLayout>
        
    );
};

export default LoginPage;
