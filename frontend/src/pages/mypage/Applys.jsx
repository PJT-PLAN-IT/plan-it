import {useEffect, useState} from "react";

import {useAxiosInstance} from "../../utils/axiosConfig.js";
import {useParams} from "react-router-dom";
import MyCard from "../../components/MyCard.jsx";
import MateInfo from "../../components/MateInfo.jsx";
import MateButton from "../../components/MateButton.jsx";
import SelectYear from "../../components/SelectYear.jsx";

function Applys(){
    const axiosInstance = useAxiosInstance();
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
            const response = await axiosInstance.get(`/api/my/mates/apply/${custNo}?year=${yearParam}`);
            const list = response.data.data;
            if (list && list.length > 0) {
                setMyList(groupByDate(list));  // 그룹화된 데이터를 상태로 설정
            }
            else {
                setMyList([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 데이터를 날짜별로 그룹화하는 함수
    const groupByDate = (list) => {
        return list.reduce((groups, item) => {
            item.startDt = item.startDt.replace(/-/g, '.')
            const date = item.startDt.substring(0, 7); // 연월까지만 비교 (ex. "202409")
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(item);
            return groups;
        }, {});
    };

    useEffect(() => {
        fetchMyMateList(year);
    }, []);

    return (
        <div>
            <div className="App mx-[300px]">
                <div className="mb-6">
                    <div className="flex justify-between mb-6">
                        <div className="flex space-x-6">
                            <MateButton custNo={custNo} value="applyMate"></MateButton>
                        </div>

                        <div className="relative flex items-center space-x-4">
                            <SelectYear year={year} onChangeYear={onChangeYear} />
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* 날짜별로 그룹화된 데이터를 순회하여 렌더링 */}
                    {Object.keys(myList).map((date) => (
                        <div key={date}>
                            <div className="text-xl font-bold text-orange-500 mb-4">{date}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myList[date].map((item, index) => (
                                    <MyCard item={item} key={index} component={ <MateInfo item={item} custNo={custNo} refreshData={fetchMyMateList}/> }/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Applys;