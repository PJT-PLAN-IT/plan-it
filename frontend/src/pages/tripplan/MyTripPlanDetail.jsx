import {Draggable} from "react-beautiful-dnd";

function MyTripPlanDetail() {
    const resultList = {
        "status": "OK",
        "message": "success",
        "data": {
            "custNo": 45,
            "tripPlanNo": 87,
            "title": "여행간다~",
            "startDt": "2024-10-23T00:00:00",
            "endDt": "2024-10-25T23:59:59",
            "thumbnailImg": null,
            "review": null,
            "publicYn": "N",
            "ownerYn": null,
            "tripPlanDetailList": [
                {
                    "tripDetailNo": 180,
                    "address": "부산광역시 수영구 광안해변로 219 (광안동)",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-23T00:00:00",
                    "contentid": "2786391",
                    "contentTypeId": "15",
                    "title": "광안리 M(Marvelous) 드론 라이트쇼",
                    "seq": 0,
                    "mapy": 35.1538,
                    "mapx": 129.119
                },
                {
                    "tripDetailNo": 181,
                    "address": "부산광역시 수영구 광안해변로 219 (광안동) ",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-23T00:00:00",
                    "contentid": "506545",
                    "contentTypeId": "15",
                    "title": "광안리어방축제",
                    "seq": 1,
                    "mapy": 35.1538,
                    "mapx": 129.119
                },
                {
                    "tripDetailNo": 182,
                    "address": "부산광역시 금정구 산성로 501-2 (금성동) ",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-23T00:00:00",
                    "contentid": "1275743",
                    "contentTypeId": "15",
                    "title": "금정산성축제",
                    "seq": 2,
                    "mapy": 35.2453,
                    "mapx": 129.057
                },
                {
                    "tripDetailNo": 183,
                    "address": "부산광역시 북구 낙동강자전거길 1455 (덕천동) 화명생태공원야구장B",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-24T00:00:00",
                    "contentid": "1719667",
                    "contentTypeId": "15",
                    "title": "낙동강 구포나루 축제",
                    "seq": 0,
                    "mapy": 35.2194,
                    "mapx": 128.999
                },
                {
                    "tripDetailNo": 184,
                    "address": "부산광역시 강서구 가락대로 929 부산경남경마공원 렛츠런파크 부산경남",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-24T00:00:00",
                    "contentid": "2993283",
                    "contentTypeId": "15",
                    "title": "렛츠런파크 부산경남 블루밍 워터페스티벌",
                    "seq": 1,
                    "mapy": 35.1557,
                    "mapx": 128.878
                },
                {
                    "tripDetailNo": 185,
                    "address": "부산광역시 금정구 장전온천천로 48 (장전동) 부산대 지하철역 아래 문화행사장 일원",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-24T00:00:00",
                    "contentid": "2484237",
                    "contentTypeId": "15",
                    "title": "라라라 페스티벌",
                    "seq": 2,
                    "mapy": 35.2297,
                    "mapx": 129.089
                },
                {
                    "tripDetailNo": 186,
                    "address": "부산광역시 중구 광복중앙로 13 (신창동1가) ",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-25T00:00:00",
                    "contentid": "3115722",
                    "contentTypeId": "15",
                    "title": "도파밍덕후: 유쾌한 구원자",
                    "seq": 0,
                    "mapy": 35.1005,
                    "mapx": 129.031
                },
                {
                    "tripDetailNo": 187,
                    "address": "부산광역시 사하구 몰운대1길 14 (다대동) ",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-25T00:00:00",
                    "contentid": "3383748",
                    "contentTypeId": "15",
                    "title": "다대포 선셋 영화 축제",
                    "seq": 1,
                    "mapy": 35.0464,
                    "mapx": 128.968
                },
                {
                    "tripDetailNo": 188,
                    "address": "부산광역시 금정구 장전온천천로 48 (장전동) 부산대 지하철역 아래 문화행사장 일원",
                    "tripPlanNo": 87,
                    "planDt": "2024-10-25T00:00:00",
                    "contentid": "2484237",
                    "contentTypeId": "15",
                    "title": "라라라 페스티벌",
                    "seq": 2,
                    "mapy": 35.2297,
                    "mapx": 129.089
                }
            ],
            "tripPlanMateList": []
        }
    };
    console.log(resultList.data.tripPlanDetailList);

    const groupByMonth = (data) => {
        return data.reduce((acc, plan) => {
            const date = new Date(plan.startDt);
            const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM 형식

            if(!acc[yearMonth]){
                acc[yearMonth] = [];
            }
            acc[yearMonth].push(plan);
            return acc;

        }, {});
    };

    const groupPlans = groupByMonth(resultList.data);

    return (
        <div className="App mx-[300px]">
            <div className={`inline-flex justify-center items-baseline`}>
                <h1 className={`text-2xl font-bold mb-10 mt-10`}>여행제목</h1>
                <h1 className={`ml-10`}> 2024-01-29 ~ 2024-01-29</h1>
                <button className={`bg-orange on p-2 rounded`}>
                    메이트 구하기
                </button>
            </div>
            {Object.keys(resultList).map(data => (
                {resultList[data]}
            ))}
        </div>
    )
}

export default MyTripPlanDetail;