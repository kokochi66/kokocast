// api.ts
import axios from 'axios';
import { getToken } from '../Auth';

const baseURL = process.env.REACT_APP_API_BASE_URL || '/';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: baseURL, // 기본 URL 설정
    // 다른 글로벌 설정들...
});

// 요청 인터셉터 추가
api.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["Content-Type"] = 'application/json';
        return config;
    },
    error => {
        // 요청 에러 처리
        console.log(error)
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        // 응답 데이터 처리 (성공 시)
        return response;
    },
    error => {
        // 응답 에러 처리
        console.log(error);
        if (error.response) {
            // 서버로부터 응답을 받았지만 오류가 있는 경우
            alert(error.response.data.message);
            return;
        } else {
            // 요청 설정 중에 오류가 발생한 경우
            alert('서버 접속에 실패하였습니다.')
        }

        return Promise.reject(error);
    }
);

export default api;
