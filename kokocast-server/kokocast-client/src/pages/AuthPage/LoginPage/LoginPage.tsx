import React, {useEffect, useState} from 'react';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";
import AuthLink from "../../../components/Auth/AuthLink";
import {useAuth} from "../../../context/Auth/AuthContext";
import {getToken, saveToken} from "../../../context/Auth";
import { api } from "../../../context/Api"
import axios from "axios";

const LoginPage = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = () => {
        api.post('/user/login', {
            nickname,
            password
        }).then(res => {
            // 로그인 처리
            login(res.data.jwtAuthLoginToken)
        }).catch(error => {
            // 오류 처리
            console.log(error);
            // if (error.response.data) {
            //     alert(error.response.data.message);
            // }
        });
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            window.location.href = '/main'
        }
    })

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
