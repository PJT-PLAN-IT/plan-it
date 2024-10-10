import { Routes, Route } from "react-router-dom";
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";
import MyPage from "../pages/MyPage.jsx";
import MyApplyMate from "../pages/MyApplyMate.jsx";
import MyLikeMate from "../pages/MyLikeMate.jsx";
import Write from "../pages/mate/Write.jsx";
import MyReply from "../pages/MyReply.jsx";
import TravelInfo from "../pages/TravelInfo.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editUserInfo/:custNo" element={<EditUserInfo />} />
      <Route path="/mypage/mate/:custNo" element={<MyPage />} />
      <Route path="/mypage/applyMate/:custNo" element={<MyApplyMate />} />
      <Route path="/mypage/likeMate/:custNo" element={<MyLikeMate />} />
      <Route path="/mypage/replys/:custNo" element={<MyReply />} />
      <Route path="/mate" element={<Write />} />
      <Route path="/travel/info" element={<TravelInfo />} />
    </Routes>
  );
}

export default AppRoutes;
