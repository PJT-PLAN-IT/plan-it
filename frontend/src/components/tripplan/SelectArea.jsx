import {useState} from "react";

const AreaList = ({ onSendData }) => {
const [isSelectedArea, setIsSelectedArea] = useState('');
const areaList = [
    {key : "전체", value : ""}
    ,{key : "서울", value : "1"}
    ,{key : "인천", value : "2"}
    ,{key : "대전", value : "3"}
    ,{key : "대구", value : "4"}
    ,{key : "광주", value : "5"}
    ,{key : "부산", value : "6"}
    ,{key : "울산", value : "7"}
    ,{key : "세종특별자치시", value : "8"}
    ,{key : "경기도", value : "31"}
    ,{key : "강원특별자치도", value : "32"}
    ,{key : "충청북도", value : "33"}
    ,{key : "충청남도", value : "34"}
    ,{key : "경상북도", value : "35"}
    ,{key : "경상남도", value : "36"}
    ,{key : "전북특별자치도", value : "37"}
    ,{key : "전라남도", value : "38"}
    ,{key : "제주도", value : "39"}
];

const handleChange = (e) => {
    const selectedValue = e.target.value;
    onSendData(selectedValue);
};

const saveAreaCode = (e) => {
    setIsSelectedArea(e.target.value);
    console.log(e.target.value);
};



    return (
        <select value={isSelectedArea} onChange={handleChange}
                className={`w-36 bg-transparent border-b-2 border-gray-500 py-2 px-4 mx-3 my-2 text-gray-700 focus:outline-none focus:border-gray-500"`}>
                {areaList.map((area) => (
                    <option key={area.key} value={area.value}>
                        {area.key}
                    </option>
                ))}
        </select>
        
    )
}

export default AreaList;