import {useEffect, useState} from "react";
import DetailPageMap from "../../components/tripplan/DetailPageMap.jsx";
import {useAxiosInstance} from "../../utils/axiosConfig.js";

function MyTripPlanDetailBye() {
    const axiosInstance = useAxiosInstance();
    const [resultList, setResultList] = useState({
        data: {
            tripPlanDetailList: []
        }
    });
    const [tripPlanNo, setTripPlanNo] = useState('87');//수정해야함

    //요청 보내기
    useEffect(() => {
        fetchDetail();
    }, []);

    const fetchDetail = async () => {
        try{
            const response = await axiosInstance.get(`/api/plan?tripPlanNo=${tripPlanNo}`);
            if(response.data){
                setResultList(response.data.data);
            }else {
                console.error('Invalid response structor', response);
            }
        }catch (error){
            console.error('서버 요청 실패', error);
            setResultList(({
                data:{
                    tripPlanDetailList: []
                }
            }))
        }
    };

    const [dateGroupPlans, setDateGroupPlans] = useState({});
    useEffect(() => {
        if( resultList.data.tripPlanDetailList){
            const groupedPlans = resultList.data.tripPlanDetailList.reduce((acc, item) => {
                const key = item.planDt.split("T")[0];
                if (!acc[key]) {
                    acc[key] = [] //키가 없으면 초기화
                }
                acc[key].push(item);
                return acc;
            }, {});
            setDateGroupPlans(groupedPlans);
        }
    }, [resultList]);
    // 리턴값 validation
    // const dateGroupPlans = resultList.data.tripPlanDetailList.reduce((acc, item) => {
    //     const key = item.planDt.split("T")[0];
    //     if (!acc[key]) {
    //         acc[key] = [] //키가 없으면 초기화
    //     }
    //     acc[key].push(item);
    //     return acc;
    // }, {});

    //오늘 날짜 체크
    const [isBefore, setIsBefore] = useState(false);

    const checkDate = () => {
        const today = new Date();
        const startDate = new Date(resultList.data.startDt);

        setIsBefore(today > startDate);

    }

    useEffect(() => {
        checkDate();
    }, [resultList.data]);

    /* 리뷰 작성 페이지 */
    const [openModal, setOpenModal] = useState(false);
    function onClickReview() {
        setOpenModal(!openModal);
    }

    return (
        <div className="App mx-[300px]">
            <div className={`mt-10 flex items-baseline justify-between`}>
                <div className={`flex items-baseline`}>
                    <h1 className={`text-xl font-bold mb-10 mt-10`}>
                        {/*{resultList.data.title}*/}
                    </h1>
                    <h1 className={`ml-10 text-sm`}>
                        {/*{resultList.data.startDt.split("T")[0]} ~ {resultList.data.endDt.split("T")[0]}*/}
                    </h1>
                </div>
                {isBefore === false && (
                    <button className={`bg-orange on p-2 rounded float-right text-sm`}>
                        메이트 구하기
                    </button>
                )}
                {isBefore === true && (
                    <button className={`bg-orange on p-2 rounded float-right text-sm`}>
                        여행 일기 작성하기
                    </button>
                )}
            </div>

            {Object.keys(dateGroupPlans).map((date, index) => (
                <div key={date} className={`p-4 flex`}>
                    <div className={`w-32 p-4 flex-none`}>
                        <div className={`font-bold mb-1`}>day {index + 1}</div>
                        <p className={`text-xs`}>{date}</p>
                    </div>
                    <div className={`p-4  flex-1  flex-col space-y-7 `}>
                        {dateGroupPlans[date].map((item, index) => (
                            <div key={index} className={`flex justify-center items-center`}>
                                <p className={`shrink-0 w-7 mx-3 rounded-full size-7 bg-orange text-white justify-center  items-center flex`}>
                                    {index + 1}
                                </p>
                                <div
                                    className={`grow h-full flex flex-col float-right text-3ml border border-gray-200 rounded-lg mx-3 p-3`}>
                                    <p className={`font-bold text-sm pb-2`}>{item.title}</p>
                                    <p className={`text-xs`}>{item.address}</p>
                                </div>
                                <button className={` border border-orange rounded-lg text-xs text-orange p-1`} onClick={onClickReview}>
                                    리뷰작성
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className={`flex w-full h-[600px] border-gray-200 border-2 my-36`}>
                <DetailPageMap planCoordinate={dateGroupPlans}/>
            </div>

        </div>
    )
}

export default MyTripPlanDetailBye;