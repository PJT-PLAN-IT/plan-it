import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Join() {
    // 입력 필드를 상태로 관리
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        nickname: '',
        phone: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: '',
        privacy: ''
    });
    const [authCode, setAuthCode] = useState("");
    const navigate = useNavigate();

    // 입력 값 변경 시 호출되는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const authCodeInputChange = (e) => {
        setAuthCode(e.target.value);
    };

    // 폼 제출 시 호출되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        // confirm 창을 띄워서 확인
        const isConfirmed = window.confirm('회원가입을 진행하시겠습니까?');
        if (!isConfirmed) {
            return; // 사용자가 "취소"를 누르면 제출하지 않음
        }

        // 서버로 보낼 데이터 (필요한 필드들만 포함)
        const payload = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            nickname: formData.nickname,
            phone: formData.phone,
            birthYear : formData.birthYear,
            birthMonth : formData.birthMonth,
            birthDay : formData.birthDay,
            gender: formData.gender,
        };

        try {
            const response = await axios.post('/api/api/auth/signup', payload);  // 서버 URL 수정 필요
            console.log(response);

            alert('회원가입이 완료되었습니다.');
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert('회원가입에 실패했습니다.');
        }
    };


    return (
        <div className="bg-white min-h-screen flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold">회원가입</h2>
                    <hr className="w-full mx-auto border-black mt-10" />
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4">
                        <label htmlFor="email" className="w-1/5 text-gray-700 font-semibold">이메일</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-3/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="이메일을 입력하세요"
                            value={formData.email}
                            onChange={handleInputChange}
                            maxLength="45"
                            required
                        />
                        <button type="button" className="w-1/5 bg-transparent text-orange border border-orange px-4 py-2 rounded-full hover:bg-orange hover:text-white">
                            인증번호
                        </button>
                    </div>

                    {/* 인증번호 입력 및 버튼 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="authCode" className="w-1/5 text-gray-700 font-semibold">인증번호</label>
                        <input
                            type="text"
                            id="authCode"
                            name="authCode"
                            className="w-3/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="인증번호를 입력하세요"
                            value={authCode}
                            onChange={authCodeInputChange}
                            required
                        />
                        <button type="button" className="w-1/5 bg-transparent text-orange border border-orange px-4 py-2 rounded-full hover:bg-orange hover:text-white">
                            확인
                        </button>
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="password" className="w-1/5 text-gray-700 font-semibold">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="confirmPassword" className="w-1/5 text-gray-700 font-semibold">비밀번호 확인</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="비밀번호를 한번 더 입력하세요"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* 이름 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="name" className="w-1/5 text-gray-700 font-semibold">이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="이름을 입력하세요"
                            value={formData.name}
                            onChange={handleInputChange}
                            maxLength="45"
                            required
                        />
                    </div>

                    {/* 닉네임 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="nickname" className="w-1/5 text-gray-700 font-semibold">닉네임</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="w-3/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="닉네임을 입력하세요"
                            value={formData.nickname}
                            onChange={handleInputChange}
                            maxLength="45"
                            required
                        />
                        <button type="button" className="w-1/5 bg-transparent text-orange border border-orange px-4 py-2 rounded-full hover:bg-orange hover:text-white">
                            중복체크
                        </button>
                    </div>

                    {/* 휴대폰 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="phone" className="w-1/5 text-gray-700 font-semibold">휴대폰</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="숫자만 입력하세요"
                            value={formData.phone}
                            onChange={handleInputChange}
                            maxLength="11"
                            required
                        />
                    </div>

                    {/* 생년월일 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="birthDate" className="w-1/5 text-gray-700 font-semibold">생년월일</label>
                        <div className="w-4/5 flex space-x-2">
                            <input
                                type="text"
                                id="birthYear"
                                name="birthYear"
                                className="w-1/3 p-2 border border-gray-300 rounded-full focus:outline-none"
                                placeholder="YYYY"
                                value={formData.birthYear}
                                onChange={handleInputChange}
                                maxLength="4"
                                required
                            />
                            <input
                                type="text"
                                id="birthMonth"
                                name="birthMonth"
                                className="w-1/3 p-2 border border-gray-300 rounded-full focus:outline-none"
                                placeholder="MM"
                                value={formData.birthMonth}
                                onChange={handleInputChange}
                                maxLength="2"
                                required
                            />
                            <input
                                type="text"
                                id="birthDay"
                                name="birthDay"
                                className="w-1/3 p-2 border border-gray-300 rounded-full focus:outline-none"
                                placeholder="DD"
                                value={formData.birthDay}
                                onChange={handleInputChange}
                                maxLength="2"
                                required
                            />
                        </div>
                    </div>

                    {/* 성별 */}
                    <div className="flex items-center gap-4">
                        <label className="w-1/5 text-gray-700 font-semibold">성별</label>
                        <div className="w-4/5 flex items-center space-x-8">
                            <label className="custom-radio flex items-center space-x-2">
                                <input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleInputChange} className="" />
                                <span>남자</span>
                            </label>
                            <label className="custom-radio flex items-center space-x-2">
                                <input type="radio" name="gender" value="W" checked={formData.gender === 'W'} onChange={handleInputChange} className="" />
                                <span>여자</span>
                            </label>
                        </div>
                    </div>

                    {/* 성별 밑에 검정색 줄 추가 */}
                    <hr className="w-full border-black my-4"/>

                    {/* 개인정보 동의 */}
                    <div className="flex items-center gap-4">
                        <label className="w-3/5 text-gray-700 font-semibold mb-10">개인정보 수집에 동의하십니까?</label>
                        <div className="w-2/5 flex items-center space-x-8 mb-10">
                            <label className="custom-radio flex items-center space-x-2">
                                <input type="radio" name="privacy" value="예" checked={formData.privacy === '예'} onChange={handleInputChange}
                                       className=""/>
                                <span>예</span>
                            </label>
                            <label className="custom-radio flex items-center space-x-2">
                                <input type="radio" name="privacy" value="아니요" checked={formData.privacy === '아니요'} onChange={handleInputChange}
                                       className=""/>
                                <span>아니요</span>
                            </label>
                        </div>
                    </div>


                    {/* 가입하기 버튼 */}
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="w-2/5 bg-orange text-white py-2 rounded-full hover:bg-orange"
                        >
                            가입하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Join;
