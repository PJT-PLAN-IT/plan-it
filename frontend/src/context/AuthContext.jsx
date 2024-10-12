import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null); // JWT 토큰 상태 관리

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const token = localStorage.getItem("token");
  const context = useContext(AuthContext);

  //might not be needed
  if (!context) {
    throw new Error("oh no no useAuth with Auth providee~~");
  }

  if (token) {
    context.setToken(token);
  }

  return context;
}
