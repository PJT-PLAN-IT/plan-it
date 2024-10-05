import {useEffect, useState} from "react";
import {useAxiosInstance} from "../utils/axiosConfig";
import {useParams} from "react-router-dom";

function EditUserInfo() {
    const {custNo} = useParams();
    const axiosInstance = useAxiosInstance();
    const [formData, setFormData] = useState({
        email       : '',
        pw          : '',
        pwConfirm   : '',
        name        : '',
        nickname    : '',
        phoneNumber : '',
        birthYear   : '',
        birthMonth  : '',
        birthDay    : '',
        gender      : '',
    });
    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/api/my_page/${custNo}`);
                const userData = response.data.data;

                // 서버에서 받은 데이터를 formData 상태에 반영
                setFormData({
                    email: userData.email,
                    name: userData.name,
                    nickname: userData.nickname,
                    phoneNumber: userData.phoneNumber,
                    birthYear: userData.birthYear,
                    birthMonth: userData.birthMonth,
                    birthDay: userData.birthDay,
                    gender: userData.gender
                });
            } catch (error) {
                console.error('서버 요청 실패:', error);
            }
        };

        fetchUserData();
    }, []);

    const inputChange = (e) => {
        const { name, value } = e.target;  // name과 value를 구조분해할당으로 추출
        setFormData({
            ...formData,
            [name]: value,  // name 속성에 해당하는 필드 업데이트
        });

        // 비밀번호와 비밀번호 확인 일치 여부 검사
        if (name === 'pwConfirm') {
            setPasswordMatch(value === formData.pw);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // 페이지 리로드 방지
        if (!passwordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/my_page/update', {
                ...formData,
                custNo : custNo
            });
            console.log('서버 응답:', response);
            alert('개인정보가 수정되었습니다.');
        } catch (error) {
            console.error('서버 요청 실패:', error);
            alert('개인정보 수정에 실패했습니다.');
        }
    };

    //중복체크
    const distinctCheckClick = async (e) => {
        e.preventDefault();

        const response = await axiosInstance.post('/api/my_page/isExists', null, {
            params: { nickName: formData.nickname }
        });
        console.log('서버 응답:', response);
        const isExist = response.data.data;
        if(isExist){
            alert("이미 존재하는 닉네임입니다.");
        }
        else{
            alert("사용가능합니다.");
        }
    };

    //탈퇴하기
    const withdrawalClick = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-white min-h-screen flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white p-8  rounded-lg mx-auto">
                {/* 회원가입 타이틀 및 검정색 줄 */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold">개인정보수정</h2>
                    <hr className="w-full mx-auto border-black mt-10" />
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* 이메일 입력 및 버튼 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="email" className="w-1/5 text-gray-700 font-semibold">이메일</label>
                        <input
                            value={formData.email}
                            type="email"
                            id="email"
                            className="w-4/5 p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-600 cursor-not-allowed"
                            placeholder="이메일을 입력하세요"
                            readOnly
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="password" className="w-1/5 text-gray-700 font-semibold">비밀번호</label>
                        <input
                            onChange={inputChange}
                            value={formData.pw || ''}
                            type="password"
                            id="password"
                            name="pw"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="confirmPassword" className="w-1/5 text-gray-700 font-semibold">비밀번호 확인</label>
                        <input
                            onChange={inputChange}
                            value={formData.pwConfirm || ''}
                            type="password"
                            id="confirmPassword"
                            name="pwConfirm"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="비밀번호를 한번 더 입력하세요"
                            required
                        />
                    </div>

                    {/* 비밀번호가 일치하지 않으면 빨간색 경고 메시지 */}
                    {!passwordMatch && (
                        <p className="text-red-500 text-sm mt-1">
                            동일한 비밀번호를 입력하세요.
                        </p>
                    )}

                    {/* 이름 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="name" className="w-1/5 text-gray-700 font-semibold">이름</label>
                        <input
                            onChange={inputChange}
                            value={formData.name}
                            type="text"
                            id="name"
                            name="name"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="이름을 입력하세요"
                            required
                        />
                    </div>

                    {/* 닉네임 입력 및 중복 체크 버튼 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="nickname" className="w-1/5 text-gray-700 font-semibold">닉네임</label>
                        <input
                            onChange={inputChange}
                            value={formData.nickname}
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="w-3/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="닉네임을 입력하세요"
                            required
                        />
                        <button
                            onClick={distinctCheckClick}
                            className="w-1/5 bg-transparent text-orange-500 border border-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white">
                            중복체크
                        </button>
                    </div>

                    {/* 휴대폰 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="phoneNumber" className="w-1/5 text-gray-700 font-semibold">휴대폰</label>
                        <input
                            onChange={inputChange}
                            value={formData.phoneNumber}
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="w-4/5 p-2 border border-gray-300 rounded-full focus:outline-none"
                            placeholder="숫자만 입력하세요"
                            required
                        />
                    </div>

                    {/* 생년월일 */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="birthDate" className="w-1/5 text-gray-700 font-semibold">생년월일</label>
                        <div className="w-4/5 flex space-x-2">
                            <input
                                onChange={inputChange}
                                value={formData.birthYear}
                                type="text"
                                id="birthYear"
                                name="birthYear"
                                className="w-1/3 p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-600 cursor-not-allowed"
                                placeholder="YYYY"
                                readOnly
                            />
                            <input
                                onChange={inputChange}
                                value={formData.birthMonth}
                                type="text"
                                id="birthMonth"
                                name="birthMonth"
                                className="w-1/3 p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-600 cursor-not-allowed"
                                placeholder="MM"
                                readOnly
                            />
                            <input
                                onChange={inputChange}
                                value={formData.birthDay}
                                type="text"
                                id="birthDay"
                                name="birthDay"
                                className="w-1/3 p-2 border border-gray-300 rounded-full bg-gray-100 text-gray-600 cursor-not-allowed"
                                placeholder="DD"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* 성별 */}
                    <div className="flex items-center gap-4">
                        <label className="w-1/5 text-gray-700 font-semibold">성별</label>
                        <div className="w-4/5 flex items-center space-x-8">
                            <label className="custom-radio flex items-center space-x-2">
                                <input type="radio" name="gender" checked={formData.gender=== 'M'} value="남자" disabled className="cursor-not-allowed" />
                                <span>남자</span>
                            </label>
                            <label className="custom-radio flex items-center space-x-2">
                                <input type="radio" name="gender" value="여자" checked={formData.gender=== 'W'} disabled className="cursor-not-allowed" />
                                <span>여자</span>
                            </label>
                        </div>
                    </div>

                    {/* 성별 밑에 검정색 줄 추가 */}
                    <hr className="w-full border-black my-4"/>
                    {/* 검정색 줄 추가 */}

                    {/* 가입하기 버튼 */}
                    <div className="flex justify-center mt-10">  {/* 가운데 정렬을 위한 flex와 justify-center 사용 */}
                        <button
                            onClick={withdrawalClick}
                            type="button"
                            className="w-1/5 bg-white-500 text-orange-500 py-2 border border-orange-500 rounded-full mt-10 mr-5">
                            회원탈퇴
                        </button>

                        <button
                            type="submit"
                            className="w-1/5 bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 mt-10">
                            수정하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUserInfo;
