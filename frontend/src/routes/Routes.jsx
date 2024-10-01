import { Routes, Route } from 'react-router-dom';
import Join from "../pages/Join.jsx";
import Login from "../pages/Login.jsx";
import EditUserInfo from "../pages/EditUserInfo.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/editUserInfo" element={<EditUserInfo/>} />
        </Routes>
    );
}

export default AppRoutes;
