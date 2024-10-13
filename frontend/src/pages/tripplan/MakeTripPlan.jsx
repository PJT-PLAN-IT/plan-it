import {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable,} from 'react-beautiful-dnd';
import AreaList from "../../components/tripplan/SelectArea.jsx";
import SelectContentTypeId from "../../components/tripplan/SelectContentTypeId.jsx";
import MapComponent from "../../components/tripplan/MapComponent.jsx";
import Calendar from "react-calendar";
// import {useAxiosInstance} from "../../utils/axiosConfig.js";
// import {useAuth} from "../../context/AuthContext.jsx";

function MakeTripPlan() {
    const searchResultList = {
        "status": "OK",
        "message": "success",
        "data": {
            "list": [
                {
                    "title": "가락몰 빵축제 전국빵지자랑",
                    "addr1": "서울특별시 송파구 양재대로 932 (가락동)",
                    "addr2": "가락몰",
                    "mapx": "127.1107693087",
                    "mapy": "37.4960786971",
                    "mlevel": "6",
                    "areacode": "1",
                    "contentid": "3113671",
                    "contenttypeid": "15",
                    "starAvg": null,
                    "reviewCount": null,
                    "reviewList": null
                },
                {
                    "title": "가락옥토버페스트 캠핑축제",
                    "addr1": "서울특별시 송파구 양재대로 932 (가락동)",
                    "addr2": "가락몰 판매동 3층 하늘공원",
                    "mapx": "127.1107693087",
                    "mapy": "37.4960786971",
                    "mlevel": "6",
                    "areacode": "1",
                    "contentid": "3379778",
                    "contenttypeid": "15",
                    "starAvg": null,
                    "reviewCount": null,
                    "reviewList": null
                },
                {
                    "title": "가락골마산아구찜",
                    "addr1": "서울특별시 송파구 송이로19길 3",
                    "addr2": "(가락동)",
                    "mapx": "127.1217599348",
                    "mapy": "37.4975120620",
                    "mlevel": "6",
                    "areacode": "1",
                    "contentid": "2757617",
                    "contenttypeid": "39",
                    "starAvg": null,
                    "reviewCount": null,
                    "reviewList": null
                },
                {
                    "addr1": "서울특별시 강동구 고덕로38길 63",
                    "addr2": "",
                    "areacode": "1",
                    "contentid": "2685271",
                    "contenttypeid": "39",
                    "mapx": "127.1427398175",
                    "mapy": "37.5517283673",
                    "title": "가마골",
                },
                {
                    "addr1": "서울특별시 강남구 언주로135길 13",
                    "addr2": "",
                    "areacode": "1",
                    "contentid": "2871443",
                    "contenttypeid": "39",
                    "mapx": "127.0341090296",
                    "mapy": "37.5168415735",
                    "title": "가람국시",
                },
                {
                    "addr1": "서울특별시 영등포구 영등포로64길 11",
                    "addr2": "",
                    "areacode": "1",
                    "booktour": "",
                    "cat1": "A05",
                    "cat2": "A0502",
                    "cat3": "A05020100",
                    "contentid": "2682774",
                    "contenttypeid": "39",
                    "createdtime": "20201117003146",
                    "firstimage": "http://tong.visitkorea.or.kr/cms/resource/38/2682638_image2_1.jpg",
                    "firstimage2": "http://tong.visitkorea.or.kr/cms/resource/38/2682638_image2_1.jpg",
                    "cpyrhtDivCd": "Type3",
                    "mapx": "126.9172780766",
                    "mapy": "37.5142453371",
                    "mlevel": "6",
                    "modifiedtime": "20210326194216",
                    "sigungucode": "20",
                    "tel": "02-849-9288",
                    "title": "가마로강정 신길삼거리",
                    "zipcode": "07317"
                },
            ],
            "numOfRows": 10,
            "pageNo": 1,
            "totalCount": 1604
        }
    };
    // const axiosInstance = useAxiosInstance();
    // const auth = useAuth();
    // const [searchData , setSearchData] = useState([]);
    const [requestData, setRequestData ] = useState({
        pageNo: 1,
        numOfRows: 10,
        arrange: "A",
    });

    // useEffect( () => {
    //     const searchResultList = async() => {
    //         try{
    //             console.log(auth.token);
    //             const response = await axiosInstance.post(`/api/open-api/place/search`, requestData);
    //             const searchResultList = response.data.data.list;
    //
    //             const resultData = searchResultList.map(res => ({
    //                 'title': res.title,
    //                 'addr1': res.addr1,
    //                 'addr2': res.addr2,
    //                 'mapx': res.mapx,
    //                 'mapy': res.mapy,
    //                 'mlevel': res.mlevel,
    //                 'areacode': res.areacode,
    //                 'contentid': res.contentid,
    //                 'contenttypeid': res.contenttypeid,
    //                 'starAvg': res.starAvg,
    //                 'reviewCount': res.reviewCount,
    //                 'reviewList': res.reviewList
    //             }));
    //             setSearchData(resultData)
    //         }catch(error){
    //             console.error('서버요청 실패 : ', error);
    //         }
    //     };
    //     searchResultList();
    // }, [requestData, axiosInstance]);
    //

    /* 지역 선택하면 부모 컴포넌트에 데이터 보내는거 확인하는 코드 */
    const selectArea = (data) => {
        console.log("데이타 " , data);
        let requestDataTemp = JSON.parse(JSON.stringify(requestData));
        requestDataTemp.areaCode = data;
        setRequestData(requestDataTemp);
        console.log(requestData);
        goClickCoord(data.mapy, data.mapx, 6);
    }

    /* 카테고리 선택하면 부모 컴포넌트에 데이터 보내는거 확인하는 코드 */
    const contentTypeSelect = (data)=> {
        let requestDataTemp = JSON.parse(JSON.stringify(requestData));
        requestDataTemp.contentTypeId = data;
        setRequestData(requestDataTemp);
        console.log(requestData);
    }

    /* 모달관련 */
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(true); //계획 짜는 모달
    const [searchBtn, setSearchBtn] = useState(true); //검색버튼
    const [selectContent , setSelectContent] = useState(false); // 검색 결과 중 하나 선택했을 때 화면 띄움

    const toggleModal = () => {
        setIsPlanModalOpen(prev => !prev);
    };

    const togglePlaceModal = () => {
        setSearchBtn(prev => !prev)
    }


    /* 지도 */
    const [coordinate, setCoordinate] = useState([]);
    const updatePlanCoord = (newMapy, newMapx) => {
        setCoordinate((prevCoordinate) => [
            ...prevCoordinate,
            {mapy : newMapy, mapx:newMapx},
        ]);
        goClickCoord(newMapy, newMapx, 3);
    };
    const [clickCoord , setClickCoord] = useState({mapy: '37.5664056', mapx:'126.9778222', level : '6'});
    const goClickCoord = (mapy, mapx, level) => {
        setClickCoord({mapy, mapx, level});
    };

    /* 여행 계획 추가 관련*/
    const [selectedPlans, setSelectedPlans] = useState({}); // 초기 상태는 빈 객체
    const [currentDay, setCurrentDay] = useState(''); // 현재 선택된 day 상태 추가

    const addPlanList = (event, day) => {
        console.log(event);
        if(!currentDay){
            alert("먼저 날짜를 선택해주세요");
            return;
        }

        setSelectedPlans(prevState => ({
            ...prevState,
            [day]: prevState[day] ? [...prevState[day], event] : [event]
        }));
        updatePlanCoord(event.mapy, event.mapx);
        console.log(selectedPlans);
    };


    const handleDayClick = (day) => {
        setCurrentDay(day); // 클릭한 날짜로 현재 선택된 day 업데이트
    };

    /* 드래그 앤 드롭 */
    const onDragEnd = (result) => {
        if (!result.destination) return;  // 아이템이 드롭된 위치가 없을 경우 드래그 종료

        const { source, destination } = result; //result 값을 받기 위한 구조분해할당

        const sourceDay = source.droppableId; // 요소의 이전 day
        const destinationDay = destination.droppableId; // 요소의 이후 day
        const sourceIndex = source.index; // 요소의 이전 day 내에서의 index
        const destinationIndex = destination.index; // 요소의 이후 day 내에서의 index
        let sourceArray = selectedPlans[sourceDay]; // drag 출발지 day list
        let destinationArray = selectedPlans[destinationDay]; // drag 목적지 day list

        let [element] = sourceArray.splice(sourceIndex, 1); // 드래그한 요소 추출 및 이전 day list에서의 삭제

        // 출발지와 목적지가 같을 경우 목적지와 출발지를 같게 설정
        if (sourceDay === destinationDay) {
            destinationArray = sourceArray;
        }

        // 목적지의 index에 추출한 요소 추가
        destinationArray.splice(destinationIndex, 0, element);

        setSelectedPlans({
            ...selectedPlans,
            [sourceDay]: sourceArray,
            [destinationDay]: destinationArray,
        });
    };

    /* 캘린더 */
    const [dateRange, setDateRange] = useState([null ,null]);
    const [showCalendar, setShowCalendar] = useState(false);
    const selectDate = (range) => {
        if (!range[0] || !range[1]) return;

        setDateRange(range);
        setShowCalendar(false);

        const start = new Date(range[0]);
        const end = new Date(range[1]);
        let days = [new Date(start).toLocaleDateString()];

        while(start.getDate() < end.getDate()){
            start.setDate(start.getDate() + 1);
            const tempDate = new Date(start).toLocaleDateString();
            days.push(tempDate);
        }

        days.map(day => {
            setSelectedPlans(prevState => ({
                ...prevState,
                [day]: []
            }));
        });
    }

    function toggleCalendar() {
        setShowCalendar(!showCalendar);
    }




    return (
        <div className={`flex h-screen`}>
            <div className={`shrink-0 w-16 z-20 bg  border border-amber-700`}>
                <div onClick={togglePlaceModal}>
                    검색
                </div>
            </div>
            <div className={`flex grow`}>
                <div
                    className={`flex items-center absolute z-10 w-96 h-full transform transition-transform duration-300 ${isPlanModalOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className={` w-96 h-screen flex flex-col bg-white border border-amber-700`}>
                        <div className={`border-b-2 h-32 px-3`}>
                            <input className={`font-bold py-4 mt-2 w-full`} placeholder={`제목을 입력해주세요.`} maxLength={15}/>
                            <div className={`py-3 inline-flex`}>
                                <h1 onClick={toggleCalendar} >
                                    {dateRange[0] && dateRange[1]
                                        ? `${dateRange[0].toLocaleDateString()} ~ ${dateRange[1].toLocaleDateString()}`
                                        : "여행 기간을 선택해주세요"}
                                </h1>
                            </div>

                            {showCalendar &&(
                                <div className={`absolute z-50 size-full`}>
                                    <Calendar
                                        onChange = {selectDate}
                                        value = {dateRange}
                                        selectRange={true}
                                        className = "cursor-pointer"/>
                                </div>
                            )}
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className={`flex-grow flex flex-col overflow-y-auto overflow-hidden`} style={{flexBasis: '0'}}>
                                {Object.keys(selectedPlans).map((day, index) => (
                                    selectedPlans[day] && (
                                    <Droppable key={day} droppableId={day}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-col pb-3`} >
                                                <div className="flex my-5 font-bold text-base w-full">
                                                    <h1>DAY {index + 1}</h1>
                                                    <h1 className={`flex items-center mx-5 font-light text-sm`}>{day}</h1>
                                                    <button className={` items-center align-middle font-light text-xs border border-gray-300 rounded-lg p-1`}
                                                            onClick={() => handleDayClick(day)} style={{ cursor: 'pointer' }}> 계획추가  </button>
                                                </div>
                                                {selectedPlans[day].map((event, numb) => (
                                                    <Draggable key={`${day}-${event.contentid}-${numb}`} draggableId={`${day}-${event.contentid}-${numb}`} index={numb}>
                                                        {(provided) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                 className={`flex h-16 my-4 justify-center items-center px-4`}
                                                                 style={{...provided.draggableProps.style}}>
                                                                <p className={` shrink-0 w-7 mx-3 rounded-full size-7 bg-orange text-white justify-center items-center flex`}>
                                                                    {numb + 1}
                                                                </p>
                                                                <div className={`grow flex border border-gray-200 h-full items-center px-4 rounded-lg `}>
                                                                    <div className={`grow h-full flex items-center text-3ml font-semibold`}>
                                                                        {event.title}
                                                                    </div>
                                                                    <i className={`shrink-0 w-5 bg-gray-400`}>휴</i>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                              {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                )))}
                            </div>
                        </DragDropContext>
                        <button className={`flex h-14 my-5 mx-3 justify-center items-center bg-[#FB6134] rounded-lg`}>
                            저장하기
                        </button>
                    </div>


                    {!searchBtn &&(
                        <button className={`absolute left-full bg-blue-500 text-white py-4 z-10 rounded-r-lg`} onClick={toggleModal}>

                            {isPlanModalOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                    </svg>
                                ) :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                </svg>
                            }
                        </button>
                    )}

                    {searchBtn && (
                        <div className={`flex absolute h-screen  z-10 w-96 left-96 py-4 pl-4 transform transition-transform duration-300`}>
                            <div className={`relative flex flex-col border border-[#FB6134] w-full h-full bg-white rounded-lg`}>
                                    <AreaList onSendData={selectArea}/>
                                    <SelectContentTypeId onSendData={contentTypeSelect} />
                                    <div className={`border border-gray-200 rounded-lg mx-3 my-5 py-3 px-2`}>
                                        궁금한 여행지를 검색해보세요!
                                    </div>
                                    <button className={` flex h-14 my-5 mx-3 justify-center items-center bg-[#FB6134] rounded-lg`} >
                                        검색
                                    </button>
                                <div className={`flex-1 flex-col overflow-y-auto overflow-hidden`}>
                                    {searchResultList.data.list.map((item) => (
                                        <div key={item.contentid} className={`flex h-auto my-4 justify-center items-center px-4 mx-4 border-2 border-gray-200 rounded-lg`}>
                                                <div className={`grow h-full flex flex-col align-middle text-3ml font-semibold`} onClick={() =>  goClickCoord(item.mapy, item.mapx, 6)}>
                                                    <div className={`grow h-full flex items-center text-3ml font-bold py-3`}>
                                                        {item.title}
                                                    </div>
                                                    <div className={`pb-3 text-xs font-light`}>{item.addr1} {item.addr2 && `(${item.addr2})`}</div>
                                                </div>
                                                <i className={`shrink-0 px size-6 border border-gray-200 rounded-full justify-center items-center flex`} onClick={() => addPlanList(item, currentDay)} style={{ cursor: 'pointer' }}>
                                                    +
                                                </i>
                                        </div>
                                    ))}
                                </div>
                                <button className={`absolute top-0 right-0 text-zinc-800 text-2xl z-10 px-3.5 py-2`}
                                        onClick={togglePlaceModal}>
                                    X
                                </button>
                            </div>
                        </div>
                    )}

                    {selectContent && (
                        <div className={`flex  items-center absolute h-screen  z-10 w-96 left-full py-4 pl-4 transform transition-transform duration-300`}>
                            <div className={`border-2 w-full h-full bg-purple-400 flex flex-col`}>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`flex-grow`}>
                    <MapComponent  planCoordinate = {selectedPlans} searchMap = {clickCoord} />
                </div>
            </div>
        </div>
    )
}

export default MakeTripPlan;
