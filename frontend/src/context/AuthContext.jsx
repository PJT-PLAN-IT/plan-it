import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [userInfo, setUserInfo] = useState(() => {
        return JSON.parse(localStorage.getItem("userInfo")) || '';
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || '';
    }); // JWT 토큰 상태 관리

    useEffect(() => {
        if(token){
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            localStorage.setItem("token", token);
        }
        else{
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
