import { Routes, Route } from "react-router-dom";
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";
import MyPage from "../pages/MyPage.jsx";
import MyApplyMate from "../pages/MyApplyMate.jsx";
import MyLikeMate from "../pages/MyLikeMate.jsx";
import Write from "../pages/mate/Write.jsx";
import MateTripPlan from "../pages/tripplan/MakeTripPlan.jsx";
function AppRoutes() {
  return (
    <Routes>
      {/* 메인 */}

      {/* 로그인 , 회원가입 */}
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />

        {/* 마이페이지 */}
      <Route path="/editUserInfo/:custNo" element={<EditUserInfo />} />
      <Route path="/mypage/mate/:custNo" element={<MyPage />} />
      <Route path="/mypage/applyMate/:custNo" element={<MyApplyMate />} />
      <Route path="/mypage/likeMate/:custNo" element={<MyLikeMate />} />

      {/* 메이트 */}
      <Route path="/mate" element={<Write />} />

        {/*  트립플랜  */}
        <Route path="/trip-plan" element={<MateTripPlan />} />

    </Routes>
  );
}

export default AppRoutes;
