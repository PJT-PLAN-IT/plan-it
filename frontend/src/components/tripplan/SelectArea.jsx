const AreaList = ({ onSendData }) => {
    const areaList = [
        { key: "전체", value: "", mapy: '37.5664056', mapx: '126.9778222' }, // 기본값: 서울
        { key: "서울", value: "1", mapy: '37.5664056', mapx: '126.9778222' }, // 서울 시청
        { key: "인천", value: "2", mapy: '37.4563', mapx: '126.7052' },      // 인천 시청
        { key: "대전", value: "3", mapy: '36.3504', mapx: '127.3845' },      // 대전 시청
        { key: "대구", value: "4", mapy: '35.8714', mapx: '128.6014' },      // 대구 시청
        { key: "광주", value: "5", mapy: '35.1595', mapx: '126.8526' },      // 광주 시청
        { key: "부산", value: "6", mapy: '35.1796', mapx: '129.0756' },      // 부산 시청
        { key: "울산", value: "7", mapy: '35.5384', mapx: '129.3114' },      // 울산 시청
        { key: "세종특별자치시", value: "8", mapy: '36.4804', mapx: '127.2895' }, // 세종 시청
        { key: "경기도", value: "31", mapy: '37.2892', mapx: '127.0535' },     // 경기도 도청
        { key: "강원특별자치도", value: "32", mapy: '37.8852', mapx: '127.7298' }, // 강원도 도청
        { key: "충청북도", value: "33", mapy: '36.63535', mapx: '127.49155' },     // 충청북도 도청
        { key: "충청남도", value: "34", mapy: '36.6588', mapx: '126.67303' },     // 충청남도 도청
        { key: "경상북도", value: "35", mapy: '36.57588', mapx: '128.50562' },     // 경상북도 도청
        { key: "경상남도", value: "36", mapy: '35.237624293792216', mapx: '128.69188718430877' },     // 경상남도 도청
        { key: "전북특별자치도", value: "37", mapy: '35.820242984255316', mapx: '127.10874992529796' }, // 전북 도청
        { key: "전라남도", value: "38", mapy: '35.237624293792216', mapx: '128.69188718430877' },     // 전남 도청
        { key: "제주특별자치도", value: "39", mapy: '33.48881721705484', mapx: '126.49841264365753' }  // 제주도 도청
    ];

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const selectedArea = areaList.find(area => area.value === selectedValue);
        if(selectedArea){
            const selectedValueList = {
                key : selectedArea.key,
                value : selectedArea.value,
                mapy : selectedArea.mapy,
                mapx : selectedArea.mapx
            }
            onSendData(selectedValueList);
        }
    };

    return (
        <select onChange={handleChange} className={`w-36 bg-transparent border-b-2 border-gray-500 py-2 px-4 mx-3 my-2 text-gray-700 focus:outline-none focus:border-gray-500"`}>
                {areaList.map((area) => (
                    <option key={area.key} value={area.value}>
                        {area.key}
                    </option>
                ))}
        </select>
        
    )
}

export default AreaList;