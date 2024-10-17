import {useAxiosInstance} from "../../utils/axiosConfig.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown} from "@fortawesome/free-solid-svg-icons";

function MyTripPlanList() {
    const axiosInstance = useAxiosInstance();
    const navigate = useNavigate();
    const crown = <FontAwesomeIcon icon={faCrown}/>;
    const [year, setYear] = useState();
    const [planResult, setPlanResult] = useState([]);
    const sendData = {
        custNo: JSON.parse(localStorage.getItem("userInfo")).custNo,
        year: 2024
    }
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [monthPlanResult, setMonthPlanResult] = useState([]);

    useEffect(() => {
        const fetchPlanList = async () => {
            try {
                const response = await axiosInstance.get(`/api/plan/list?custNo=${sendData.custNo}&year=${sendData.year}`);
                // console.log(response.data.data);
                setPlanResult(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlanList();
    }, []);

    useEffect(() => {
        console.log('planResult: ', planResult);
        makeMonthPlanResult();
    }, [planResult]);

    useEffect(() => {
        console.log('monthPlanResult: ', monthPlanResult);
    }, [monthPlanResult]);

    const makeMonthPlanResult = () => {
        let monthPlanList = [];
        months.map(month => {
            const result = planResult.filter(plan => new Date(plan.startDt).getMonth() + 1 === month);
            monthPlanList.push(result);
        });
        setMonthPlanResult(monthPlanList);
    };

    return (
        <div className="App mx-[300px]">
            <h1 className={`text-2xl font-bold mb-10 mt-10`}>나의 여행</h1>

            {
                Object.keys(monthPlanResult).map((index) => (
                    <div key={index}>
                        {
                            monthPlanResult[index].length > 0 && (
                                <>
                                    <h2 className="font-semibold text-lg mb-5 mt-8 ">2024.{Number(index) + 1}</h2>
                                    <div className={`grid grid-cols-3 gap-10`}>
                                        {monthPlanResult[index].map((item) => (
                                            <div key={item.tripPlanNo} onClick={() => navigate(`/plan/${item.tripPlanNo}`)}
                                                 className={` bg-black bg-opacity-5 h-48 mb-4 rounded-lg`}>
                                                {/*<div className={`h-2/3 bg-neutral-100 outline-gray-300`}>*/}
                                                {/*    /!*    이미지 구역   *!/*/}
                                                {/*</div>*/}
                                                <div className={`p-5`}>
                                                    <p className={`font-bold mb-2`}>{item.title}</p>
                                                    <p className={`text-sm`}>{item.startDt.split('T')[0]} ~ {item.endDt.split('T')[0]}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default MyTripPlanList;