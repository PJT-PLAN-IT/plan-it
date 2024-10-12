import { Routes, Route } from "react-router-dom";
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";
import MyPage from "../pages/mypage/MyPage.jsx";
import Applys from "../pages/mypage/Applys.jsx";
import Likes from "../pages/mypage/Likes.jsx";
import Write from "../pages/mate/Write.jsx";
import Detail from "../pages/mate/Detail.jsx";
import MainPage from "../pages/MainPage.jsx";
import MyReply from "../pages/mypage/MyReply.jsx";
import TravelInfo from "../pages/travel/TravelInfo.jsx";
import TravelDetail from "../pages/travel/TravelDetail.jsx";
import MyReview from "../pages/mypage/MyReview.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editUserInfo/:custNo" element={<EditUserInfo />} />
      <Route path="/mypage/mate/:custNo" element={<MyPage />} />
      <Route path="/mypage/applys/:custNo" element={<Applys />} />
      <Route path="/mypage/likes/:custNo" element={<Likes />} />
      <Route path="/mypage/replys/:custNo" element={<MyReply />} />
      <Route path="/mypage/reviews/:custNo" element={<MyReview />} />
      <Route path="/mate" element={<Write />} />
      <Route path="/details/:findMateNo" element={<Detail />} />
      <Route path="/planit" element={<MainPage />} />
      <Route path="/travel/info" element={<TravelInfo />} />
      <Route path="/travel/detail" element={<TravelDetail />} />
    </Routes>
  );
}

export default AppRoutes;
