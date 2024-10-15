function MyTripPlanList() {

    const planResult = {
        "status": "OK",
        "message": "success",
        "data": [
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 72,
                "startDt": "2024-10-23T15:00:00",
                "endDt": "2024-10-26T14:59:59",
                "ownerYn": "Y",
                "title": "여행테스트"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 74,
                "startDt": "2024-10-22T15:00:00",
                "endDt": "2024-10-25T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 70,
                "startDt": "2024-10-20T00:20:44",
                "endDt": "2024-10-23T00:20:44",
                "ownerYn": "Y",
                "thumbnailImg": "lkj;ke;f/alwkej;fa",
                "title": "마지막으로 가즈아"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 81,
                "startDt": "2024-10-16T15:00:00",
                "endDt": "2024-10-19T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 86,
                "startDt": "2024-10-16T00:00:00",
                "endDt": "2024-10-17T23:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 73,
                "startDt": "2024-10-15T15:00:00",
                "endDt": "2024-10-18T14:59:59",
                "ownerYn": "Y",
                "title": "여행간다"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 85,
                "startDt": "2024-10-15T15:00:00",
                "endDt": "2024-10-17T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 82,
                "startDt": "2024-10-15T15:00:00",
                "endDt": "2024-10-18T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 79,
                "startDt": "2024-10-14T15:00:00",
                "endDt": "2024-10-17T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 83,
                "startDt": "2024-10-14T15:00:00",
                "endDt": "2024-10-16T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 80,
                "startDt": "2024-10-14T15:00:00",
                "endDt": "2024-10-17T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 84,
                "startDt": "2024-04-14T15:00:00",
                "endDt": "2024-04-16T14:59:59",
                "ownerYn": "Y",
                "title": "test"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 77,
                "startDt": "2024-04-08T15:00:00",
                "endDt": "2024-08-11T14:59:59",
                "ownerYn": "Y",
                "title": "ㅅㄷㄴㅅ"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 75,
                "startDt": "2024-11-08T15:00:00",
                "endDt": "2024-11-10T15:00:00",
                "ownerYn": "Y",
                "title": "ㅅㄷㄴㅅ"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 78,
                "startDt": "2024-11-08T15:00:00",
                "endDt": "2024-11-11T14:59:59",
                "ownerYn": "Y",
                "title": "9에서11일"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 76,
                "startDt": "2024-09-08T15:00:00",
                "endDt": "2024-10-11T14:59:59",
                "ownerYn": "Y",
                "title": "ㅅㄷㄴㅅ"
            },
            {
                "custNo": 45,
                "publicYn": "N",
                "tripPlanNo": 71,
                "startDt": "2024-09-08T15:00:00",
                "endDt": "2024-10-11T14:59:59",
                "ownerYn": "Y",
                "title": "ㅅㄷㄴㅅ"
            }
        ]
    };

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

    const groupPlans = groupByMonth(planResult.data);
    // 월별 키를 정렬
    const sortedMonths = Object.keys(groupPlans).sort((a, b) => new Date(a) - new Date(b));
    return (
        <div className="App mx-[300px]">
            <h1 className={`text-2xl font-bold mb-10 mt-10`}>나의 여행</h1>

            {sortedMonths.map(date => (
                <div key={date}>
                    <h2 className="font-semibold text-lg mb-5 mt-8 ">{date}</h2>
                    <div className={`grid grid-cols-3 gap-10`}>
                    {groupPlans[date].map((item) => (
                        <div key={item.tripPlanNo} className={`h-48 border-gray-200 border-2 mb-4 rounded-lg`}>
                            <div className={`h-2/3 bg-neutral-100`}>
                            {/*    이미지 구역   */}
                            </div>
                            <div className={`p-2`}>
                                <p className={`font-bold`}>{item.title}</p>
                                <p className={`text-xs`}>{item.startDt} ~ {item.endDt}</p>
                                {item.ownerYn ==='Y' && (
                                    <p className={`font-bold`}>{item.title}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyTripPlanList;