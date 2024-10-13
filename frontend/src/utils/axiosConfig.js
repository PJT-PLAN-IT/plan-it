import axios from "axios";
import { useAuth } from "../context/AuthContext"; // 토큰 관리를 위한 AuthContext 사용
// import {useNavigate} from "react-router-dom";

// Axios 인스턴스를 반환하는 함수
export const useAxiosInstance = () => {
  const { token, setToken } = useAuth(); // AuthContext에서 토큰 가져오기
  // const navigate  = useNavigate();

  // Axios 인스턴스 생성
  const axiosInstance = axios.create({
    baseURL: "/", // 공통 API 경로
    withCredentials: true, // CORS 허용을 위한 옵션
  });

  // 요청 인터셉터 설정
  axiosInstance.interceptors.request.use(
    (config) => {
      // JWT 토큰이 있으면 Authorization 헤더에 추가
      console.log("TEST" + token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 설정
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("response", error.response);
      if (
        (error.response && error.response.status === 401) ||
        (error.response && error.response.status === 403)
      ) {
        // 401 Unauthorized 에러가 발생하면 로그인 페이지로 리다이렉트
        //setToken(null);  // 만료된 토큰 제거
        /*TODO 인증오류로 발생했으면 로그인페이지로 리턴 임시 주석*/
        // navigate('/login');  // 로그인 페이지로 이동
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
