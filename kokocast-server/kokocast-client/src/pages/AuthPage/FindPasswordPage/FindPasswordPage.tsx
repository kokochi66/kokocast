import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";
import AuthLink from "../../../components/Auth/AuthLink";
import {api} from "../../../context/Api";

const FindPasswordPage = () => {
    const [nickname, setNickname] = useState("");

    const handleFindPassword = () => {
        api.post('/user/find-password', {
            nickname
        }).then(res => {
            // 비밀번호 찾기 요청 처리
            console.log('res = ', res);
            window.location.href = `/auth/change-password?changePasswordKey=${res.data.changePasswordEncoded}`
        }).catch(error => {
            // 오류 처리
            console.log('err = ', error);
            if (error.response.data) {
                alert(error.response.data.message);
            }
        });
    };

    return (
        <AuthLayout title="Find Password">
            <AuthInput
                title="Nickname"
                type="text"
                onChange={(e) => setNickname(e.target.value)}
            />
            <AuthButton
                buttonName="비밀번호 찾기"
                onClick={handleFindPassword}
            />
            <AuthLink
                leftLink="/auth/register"
                leftName="회원가입"
                rightLink="/auth/login"
                rightName="로그인"
            />
        </AuthLayout>
    );
};

export default FindPasswordPage;
