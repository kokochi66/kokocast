import React, {useEffect, useState} from 'react';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";
import AuthLink from "../../../components/Auth/AuthLink";
import axios from "axios";
import { api } from "../../../context/Api";
import {useAuth} from "../../../context/Auth/AuthContext";
import {getToken} from "../../../context/Auth"; // 추가적인 스타일을 위한 CSS 파일

const RegisterPage = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const { login } = useAuth();

    const handleRegister = () => {
        if (password !== passwordConfirm) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        api.post('/user/register', {
            nickname,
            password,
            passwordConfirm
        }).then(res => {
            // 회원가입 처리
            alert('회원가입에 성공했습니다.')
            login(res.data.jwtAuthLoginToken)
        }).catch(error => {
            // 오류 처리
            if (error.response.data) {
                alert(error.response.data.message);
            }
            console.log('err = ', error);
        });
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            window.location.href = '/main'
        }
    })


    return (
        <AuthLayout title="Register">
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
            <AuthInput
                title="Password Confirm"
                type="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <AuthButton
                buttonName="회원가입"
                onClick={handleRegister}
            />
            <AuthLink
                leftLink="/auth/login"
                leftName="로그인"
                rightLink="/auth/find-password"
                rightName="비밀번호 찾기"
            />
        </AuthLayout>

    );
};

export default RegisterPage;
