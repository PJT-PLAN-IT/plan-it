import { Routes, Route } from 'react-router-dom';
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";
import MyPage from "../pages/MyPage.jsx";
import MyApplyMate from "../pages/MyApplyMate.jsx";
import MyLikeMate from "../pages/MyLikeMate.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/editUserInfo/:custNo" element={<EditUserInfo/>}  />
            <Route path="/mypage/mate/:custNo" element={<MyPage/>} />
            <Route path="/mypage/applyMate/:custNo" element={<MyApplyMate/>} />
            <Route path="/mypage/likeMate/:custNo" element={<MyLikeMate/>} />
        </Routes>
    );
}

export default AppRoutes;
