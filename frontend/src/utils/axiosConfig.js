import axios from "axios";
import { useAuth } from "../context/AuthContext";  // 토큰 관리를 위한 AuthContext 사용

// Axios 인스턴스를 반환하는 함수
export const useAxiosInstance = () => {
    const { token } = useAuth();  // AuthContext에서 토큰 가져오기

    // Axios 인스턴스 생성
    const axiosInstance = axios.create({
        baseURL: "/",  // 공통 API 경로
        withCredentials: true,  // CORS 허용을 위한 옵션
    });

    // 요청 인터셉터 설정
    axiosInstance.interceptors.request.use(
        (config) => {
            // JWT 토큰이 있으면 Authorization 헤더에 추가
            console.log("TEST" +token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};
