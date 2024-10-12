import { Routes, Route } from "react-router-dom";
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";
import MyPage from "../pages/mypage/MyPage.jsx";
import Applys from "../pages/mypage/Applys.jsx";
import Likes from "../pages/mypage/Likes.jsx";
import Write from "../pages/mate/Write.jsx";
import MateTripPlan from "../pages/tripplan/MakeTripPlan.jsx";
import Detail from "../pages/mate/Detail.jsx";
import MainPage from "../pages/MainPage.jsx";
import MyReply from "../pages/mypage/MyReply.jsx";
import TravelInfo from "../pages/travel/TravelInfo.jsx";
import TravelDetail from "../pages/travel/TravelDetail.jsx";


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
      <Route path="/mypage/applys/:custNo" element={<Applys />} />
      <Route path="/mypage/likes/:custNo" element={<Likes />} />
      <Route path="/mypage/replys/:custNo" element={<MyReply />} />
      <Route path="/mate" element={<Write />} />
      <Route path="/details/:findMateNo" element={<Detail />} />
      <Route path="/planit" element={<MainPage />} />

      {/* 여행 정보 */}
      <Route path="/travel/info" element={<TravelInfo />} />
      <Route path="/travel/detail" element={<TravelDetail />} />

      {/* 메이트 */}
      <Route path="/mate" element={<Write />} />

      {/*  트립플랜  */}
      <Route path="/trip-plan" element={<MateTripPlan />} />

    </Routes>
  );
}

export default AppRoutes;
