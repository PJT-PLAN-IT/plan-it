import { Routes, Route } from "react-router-dom";
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";
import MyPage from "../pages/MyPage.jsx";
import Write from "../pages/mate/Write.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editUserInfo/:custNo" element={<EditUserInfo />} />
      <Route path="/mypage/:custNo" element={<MyPage />} />
      <Route path="/mate" element={<Write />} />
    </Routes>
  );
}

export default AppRoutes;
