import {useState} from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const {setToken} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);  // 로딩 상태 관리

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);  // 로딩 상태 활성화

        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });

            // 로그인 성공 시 처리
            console.log(response.data);
            alert('로그인 성공!');
            setToken(response.data.token);
            navigate("/editUserInfo/"+ `${response.data.custNo}`);
        } catch (err) {
            console.log(err);
            alert('로그인에 실패했습니다.');
        } finally {
            setLoading(false);  // 로딩 상태 비활성화
        }
    };

    //회원가입 페이지 이동
    const goJoinPage = () => {
        navigate('/join');
    };

    return (
        <main className="flex-grow flex items-center justify-center mt-40">
            <div className="w-full max-w-md bg-white rounded-lg p-8">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold text-orange-500 mb-10">planit</h2>
                    <h3 className="text-2xl font-bold mb-2">로그인</h3>
                    <p className="text-gray-500 mb-10">로그인 후 플랫폼의 기능을 누려보세요!</p>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            placeholder="이메일을 다시 입력해 주세요"
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  // 이메일 입력값 업데이트
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="비밀번호 입력"
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 mb-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  // 비밀번호 입력값 업데이트
                            required
                        />
                    </div>

                    {/* 로딩 중일 때 버튼 비활성화 */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300"
                            disabled={loading}>
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={goJoinPage}
                            type="button"
                            className="w-full bg-transparent border border-orange-500 text-orange-500 py-3 rounded-full font-semibold hover:bg-orange-50 transition duration-300">
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login;