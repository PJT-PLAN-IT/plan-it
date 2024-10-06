/*
* 내가 작성한 메이트글 하단 지원자리스트 제어
*
* */

import {useState} from "react";
import {useAxiosInstance} from "../utils/axiosConfig.js";

function ApplyDropdown({ applyList, refreshData }) {
    const axiosInstance = useAxiosInstance();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        console.log('Dropdown toggled:', isOpen); // 상태 확인을 위한 로그
    };

    const custButtonClick = async (e, apply) => {
        const buttonValue = e.target.value === "allow" ? "Y" : "N";
        const param = {
            findMateApplyNo : apply.findMateApplyNo,
            tripPlanNo      : apply.tripPlanNo,
            custNo          : apply.custNo,
            allowYn         : buttonValue === "Y" ? "Y" : '',
            refuseYn        : buttonValue === "N" ? "Y" : ''
        }
        const response = await axiosInstance.post("/api/my/mates/approval", param);
        if(response.data.code === 200){
            console.log("성공");
            refreshData("2024"); // 데이터 새로고침
        }
    };

    const isNull = (e) => {
        return e === null || e === undefined || e === "";
    }

    const allowCount = applyList.filter(apply => apply.allowYn === "Y").length;

    return (
        <>
            <div className="relative inline-block text-left">
                {/* 지원자 리스트 버튼 */}
                <div>
                    <button
                        onClick={toggleDropdown}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        지원자 리스트
                        <svg
                            className="ml-2 -mr-1 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true">
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* 드롭다운 메뉴 */}
                {isOpen && (
                    <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {applyList.length > 0 ? (
                                applyList.map((apply) => (
                                    <div key={apply.findMateApplyNo}
                                         className="px-4 py-2 flex justify-between items-center">
                                        <span className="font-bold text-gray-700">{apply.custName}</span>
                                        {
                                            (isNull(apply.allowYn) && isNull(apply.refuseYn))  && (
                                                <div className="flex space-x-2">
                                                    <button onClick={(e) => custButtonClick(e, apply)}
                                                            className="bg-orange-500 text-white px-3 py-1 text-xs rounded"
                                                            value="allow">승인
                                                    </button>
                                                    <button onClick={(e) => custButtonClick(e, apply)}
                                                            className="border border-orange-500 text-orange-500 px-3 py-1 text-xs rounded"
                                                            value="reject">거절
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            ) : (
                                <p className="px-4 py-2 text-sm text-gray-500">지원자가 없습니다.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex space-x-2">
                {applyList.length > 0 ? (
                    <p>{allowCount} / {applyList.length}</p>
                ) : null}
            </div>
        </>
    );
}

export default ApplyDropdown;
