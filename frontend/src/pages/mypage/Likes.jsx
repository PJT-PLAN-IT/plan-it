import {useEffect, useState} from "react";

import {useAxiosInstance} from "../../utils/axiosConfig.js";
import {useParams} from "react-router-dom";
import MyCard from "../../components/MyCard.jsx";
import Like from "../../components/Like.jsx";
import MateButton from "../../components/MateButton.jsx";
import SelectYear from "../../components/SelectYear.jsx";

function Likes(){
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
            const response = await axiosInstance.get(`/api/my/mates/likes/${custNo}?year=${yearParam}`);
            const list = response.data.data;
            if (list && list.length > 0) {
                setMyList(list);
            }
            else{
                setMyList([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 데이터를 날짜별로 그룹화하는 함수
    useEffect(() => {
        fetchMyMateList(year);
    }, []);

    return (
        <div className="App mx-[300px]">
            <div className="mb-6">
                <div className="flex justify-between mb-6">
                    <div className="flex space-x-6">
                        <MateButton custNo={custNo} value="likeMate"></MateButton>
                    </div>

                    <div className="relative flex items-center space-x-4">
                        <SelectYear year={year} onChangeYear={onChangeYear} />
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myList.map((item, index) => (
                        <MyCard item={item} key={index} component={ <Like item={item} refreshData={fetchMyMateList} /> }/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Likes;