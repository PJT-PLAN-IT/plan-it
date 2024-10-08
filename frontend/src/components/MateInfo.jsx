/*
* 내가 신청한 메이트글 하단 버튼 제어
* */

import {useEffect, useState} from "react";
import {useAxiosInstance} from "../utils/axiosConfig.js";

function MateInfo({item, custNo, refreshData}) {
    const [isStarted, setIsStarted] = useState(false);
    const axiosInstance = useAxiosInstance();

    useEffect(() => {
        const currentDate = new Date();
        const startDate = new Date(item.startDt);
        // 여행 시작일자가 현재보다 지났는지 체크
        if (startDate < currentDate) {
            setIsStarted(true); // 이미 시작된 경우
        }
    }, [item.startDt]);

    //취소
    const cancelOnClick =  async () => {
        try {
            const param = {
                findMateNo : item.findMateNo,
                custNo     : custNo
            };

            const response = await axiosInstance.post("/api/my/mates/apply/cancel", param);
            if (response.data.code === 200) {
                console.log("취소 성공");
                refreshData("2024"); // 데이터 새로고침
            } else {
                console.error("취소 실패", response.data.message);
            }
        } catch (error) {
            console.error("서버 오류", error);
        }
    };

    //탈퇴
    const secessionOnClick = async () => {
        try {
            const param = {
                tripMateNo: item.tripMateNo
            };

            const response = await axiosInstance.post("/api/my/mates/apply/secession", param);
            if (response.data.code === 200) {
                console.log("탈퇴 성공");
                refreshData("2024"); // 데이터 새로고침
            } else {
                console.error("탈퇴 실패", response.data.message);
            }
        } catch (error) {
            console.error("서버 오류", error);
        }
    };

    return (
        <>
            <div>여행 메이트 : {name}</div>
            {
                !isStarted && (
                    <div className="flex space-x-2">
                        {item.tripMateNo ? (
                            <button
                                onClick={secessionOnClick}
                                className="px-4 py-2 text-sm border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition">
                                탈퇴
                            </button>
                        ) : (
                            <>
                                <button
                                    className="px-4 py-2 text-sm border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition">
                                    대기중
                                </button>
                                <button
                                    onClick={cancelOnClick}
                                    className="px-4 py-2 text-sm border border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition">
                                    취소
                                </button>
                            </>
                            )
                        }
                    </div>
                )
            }

        </>
    );
}

export default MateInfo;