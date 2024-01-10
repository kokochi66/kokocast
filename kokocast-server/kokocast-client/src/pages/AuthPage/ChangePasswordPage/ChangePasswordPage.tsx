import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from "../../../layouts/AuthLayout";
import AuthInput from "../../../components/Auth/AuthInput";
import AuthButton from "../../../components/Auth/AuthButton";

const ChangePasswordPage = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handlePasswordChange = () => {
        // 여기서 요청 URL을 설정합니다.
        axios.post('/user/change-password', {
            password,
            passwordConfirm
        }).then(res => {
            // 비밀번호 변경 처리
            console.log('res = ', res);
        }).catch(error => {
            // 오류 처리
            console.log('err = ', error);
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
