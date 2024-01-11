import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {saveToken} from "./AuthService";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = 'kokocast_authorization_token_key';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        () => localStorage.getItem(AUTH_STORAGE_KEY) !== null
    );

    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem(AUTH_STORAGE_KEY);
            // 여기서 토큰 유효성 검증 로직이 필요할 수 있습니다.
        }
    }, [isLoggedIn]);

    const login = (token: string) => {
        localStorage.setItem(AUTH_STORAGE_KEY, token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
