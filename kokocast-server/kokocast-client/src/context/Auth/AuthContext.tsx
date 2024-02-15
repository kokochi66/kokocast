import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {clearToken, getProfileImageUrl, getToken, saveProfileImageUrl, saveToken} from "./AuthService";


interface AuthContextType {
    isLoggedIn: boolean;
    profileImageUrl: string | undefined;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        () => getToken() !== null
    );
    const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
        getProfileImageUrl()
    );

    useEffect(() => {
        if (isLoggedIn) {
            const token = getToken();
            // 여기서 토큰 유효성 검증 로직이 필요할 수 있습니다.
        }
    }, [isLoggedIn]);

    const login = (res: any) => {
        console.log(res);
        saveToken(res['jwtAuthLoginToken']);

        if (res['profileImageUrl']) {
            saveProfileImageUrl(res['profileImageUrl']);
            setProfileImageUrl(res['profileImageUrl']);
        }
        setIsLoggedIn(true);
    };

    const logout = () => {
        clearToken();
        setIsLoggedIn(false);
        setProfileImageUrl('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, profileImageUrl, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
