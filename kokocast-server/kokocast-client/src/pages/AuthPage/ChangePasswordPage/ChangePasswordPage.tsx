import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";
import {useLocation} from "react-router-dom";

const ChangePasswordPage = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const changePasswordEncoded = searchParams.get('changePasswordKey');

    const handlePasswordChange = () => {
        // 여기서 요청 URL을 설정합니다.
        axios.post('/user/change-password', {
            password,
            changePasswordEncoded
        }).then(res => {
            // 비밀번호 변경 처리
            console.log('res = ', res);
            alert('비밀번호 변경이 성공하였습니다.');
            window.location.href = "/main"
        }).catch(error => {
            // 오류 처리
            console.log('err = ', error);
            if (error.response.data) {
                alert(error.response.data.message);
            }
        });
    };

    return (
        <AuthLayout title="Change Password">
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
                buttonName="비밀번호 변경"
                onClick={handlePasswordChange}
            />
        </AuthLayout>
    );
};

export default ChangePasswordPage;
