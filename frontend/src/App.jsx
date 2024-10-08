import { Header } from "./components/Header";
import AppRoutes from "./routes/Routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
// front back 연동 확인용-----확인 했으면 지우기!
// back 에는 get방식의 /server/test api 요청을 받을 수 있는 controller가 있어야함.(testcontroller에 기제되어있음)
// /api는 vite.config.js에 설정된 것임.

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get("/api/test/")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error(
          "API 요청 에러:",
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  return (
    <>
      <div className="mx-[300px]">
        <Header />
        <br></br>
        <h1 className="text-3xl font-bold underline">
          받은 데이터 확인 : {data}
        </h1>
      </div>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
