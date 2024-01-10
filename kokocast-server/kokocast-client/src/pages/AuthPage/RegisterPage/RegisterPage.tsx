import React, {useState} from 'react';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";
import AuthLink from "../../../components/Auth/AuthLink";
import axios from "axios"; // 추가적인 스타일을 위한 CSS 파일

const RegisterPage = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleRegister = () => {
        axios.post('/user/register', {
            nickname,
            password,
            passwordConfirm
        }).then(res => {
            // 로그인 처리
            console.log('res = ', res);
        }).catch(error => {
            // 오류 처리
            console.log('err = ', error);
        });
    };


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
