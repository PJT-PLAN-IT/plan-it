import {useEffect, useState} from "react";

import {useAxiosInstance} from "../utils/axiosConfig.js";
import {useNavigate, useParams} from "react-router-dom";
import MyCard from "../components/MyCard.jsx";
import Like from "../components/Like.jsx";

function MyPage(){
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate();
    const {custNo} = useParams();
    const [year, setYear] = useState("2024");
    const [myList, setMyList] = useState([]);

    const onChangeYear = (e) => {
        const year = e.target.value;
        setYear(e.target.value);
        fetchMyMateList(year);
    };

    const fetchMyMateList = async (yearParam) => {
        try {
            const response = await axiosInstance.get(`/api/my/mates/likes/${custNo}?year=${yearParam}`);
            const list = response.data.data;
            if (list && list.length > 0) {
                setMyList(list);  // 그룹화된 데이터를 상태로 설정
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 데이터를 날짜별로 그룹화하는 함수
    useEffect(() => {
        fetchMyMateList(year);
    }, []);

    const goPage = (e) => {

        e.preventDefault();
        let buttonValue = e.target.value;
        if(buttonValue === "registerMate"){//작성한 메이트글
            navigate(`/mypage/mate/${custNo}`);
        }
        else if(buttonValue === "applyMate"){
            navigate(`/mypage/applyMate/${custNo}`)
        }
        else if(buttonValue === "likeMate"){
            navigate(`/mypage/likeMate/${custNo}`)
        }
        else{
            //TODO 작성하기 페이지로 이동
        }
    };

    return (
        <div className="container mx-auto p-20">
            <div className="mb-6">
                <div className="flex justify-between mb-6">
                    <div className="flex space-x-6">
                        <button value="registerMate" onClick={goPage} className="font-bold text-orange-500">작성한 메이트글</button>
                        <button value="applyMate"    onClick={goPage} className="font-bold text-gray-500">신청한 메이트글</button>
                        <button value="likeMate"     onClick={goPage} className="font-bold text-gray-500">좋아요 한 메이트 글</button>
                    </div>

                    <div className="relative flex items-center space-x-4">
                        <select
                            value={year}
                            onChange={onChangeYear}
                            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.293 7.293l4 4a1 1 0 0 0 1.414 0l4-4A1 1 0 0 0 13.293 6.293L10 9.586 6.707 6.293A1 1 0 0 0 5.293 7.293z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myList.map((item, index) => (
                        <MyCard item={item} key={index} component={ <Like item={item} custNo={custNo}/> }/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyPage;