// api.ts
import axios from 'axios';
import { getToken } from '../Auth';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: '/', // 기본 URL 설정
    // 다른 글로벌 설정들...
});

// 요청 인터셉터 추가
api.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

export default api;
