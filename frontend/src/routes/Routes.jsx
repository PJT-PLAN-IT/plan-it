import { Routes, Route } from "react-router-dom";
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";
import MyPage from "../pages/mypage/MyPage.jsx";
import Applys from "../pages/mypage/Applys.jsx";
import Likes from "../pages/mypage/Likes.jsx";
import Write from "../pages/mate/Write.jsx";
import MakeTripPlan from "../pages/tripplan/MakeTripPlan.jsx";
import Detail from "../pages/mate/Detail.jsx";
import MainPage from "../pages/MainPage.jsx";
import DetailEdit from "../pages/mate/DetailEdit.jsx";
import MyReply from "../pages/mypage/MyReply.jsx";
import TravelInfo from "../pages/travel/TravelInfo.jsx";
import TravelDetail from "../pages/travel/TravelDetail.jsx";
import MyReview from "../pages/mypage/MyReview.jsx";
import MyTripPlanList from "../pages/tripplan/MyTripPlanList.jsx";
import MyTripPlanDetail from "../pages/tripplan/MyTripPlanDetail.jsx";

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
      <Route path="/mypage/reviews/:custNo" element={<MyReview />} />
      <Route path="/mate" element={<Write />} />
      <Route path="/mate/edit" element={<DetailEdit />} />
      <Route path="planit/mates/details" element={<Detail />} />
      <Route path="/planit" element={<MainPage />} />

      {/* 여행 정보 */}
      <Route path="/travel/info" element={<TravelInfo />} />
      <Route path="/travel/detail" element={<TravelDetail />} />

      {/* 메이트 */}
      <Route path="/mate" element={<Write />} />

      {/*  트립플랜  */}
      <Route path="/plan" element={<MakeTripPlan />} />
      <Route path="/plan/list/:custNo/:year" element={<MyTripPlanList />} />
      <Route path="/plan/:tripPlanNo" element={<MyTripPlanDetail />} />
    </Routes>
  );
}

export default AppRoutes;
