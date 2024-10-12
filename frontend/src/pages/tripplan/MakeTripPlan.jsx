import {useEffect, useState} from "react";
import { DragDropContext, Draggable, Droppable,} from 'react-beautiful-dnd';
import AreaList from "../../components/tripplan/SelectArea.jsx";
import SelectContentTypeId from "../../components/tripplan/SelectContentTypeId.jsx";
import MapComponent from "../../components/tripplan/MapComponent.jsx";
import {useAxiosInstance} from "../../utils/axiosConfig.js";
import {useAuth} from "../../context/AuthContext.jsx";

function MakeTripPlan() {
    const axiosInstance = useAxiosInstance();
    const auth = useAuth();
    const [searchData , setSearchData] = useState([]);
    const [requestData, setRequestData ] = useState({
        pageNo: 1,
        numOfRows: 10,
        arrange: "A",
    });

    useEffect( () => {
        const searchResultList = async() => {
            try{
                console.log(auth.token);
                const response = await axiosInstance.post(`/api/open-api/place/search`, requestData);
                const searchResultList = response.data.data.list;

                const resultData = searchResultList.map(res => ({
                    'title': res.title,
                    'addr1': res.addr1,
                    'addr2': res.addr2,
                    'mapx': res.mapx,
                    'mapy': res.mapy,
                    'mlevel': res.mlevel,
                    'areacode': res.areacode,
                    'contentid': res.contentid,
                    'contenttypeid': res.contenttypeid,
                    'starAvg': res.starAvg,
                    'reviewCount': res.reviewCount,
                    'reviewList': res.reviewList
                }));
                setSearchData(resultData)
            }catch(error){
                console.error('서버요청 실패 : ', error);
            }
        };
        searchResultList();
    }, [requestData, axiosInstance]);


    /* 지역 선택하면 부모 컴포넌트에 데이터 보내는거 확인하는 코드 */
    const areaSelect = (data) => {
        let requestDataTemp = JSON.parse(JSON.stringify(requestData));
        requestDataTemp.areaCode = data;
        setRequestData(requestDataTemp);
        console.log(requestData);
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


    /* 여행 계획 추가 관련*/
    const [selectedPlans, setSelectedPlans] = useState([]); // 초기 상태는 빈 객체
    const [startDate, setStartDate] = useState(""); //시작날짜
    const [endDate, setEndDate] = useState(""); //끝날 날짜
    const [totalDays, setTotalDays] = useState([]); // 총 날짜 배열 추가
    const [currentDay, setCurrentDay] = useState(''); // 현재 선택된 day 상태 추가

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
                }
            ],
            "numOfRows": 10,
            "pageNo": 1,
            "totalCount": 1604
        }
    };

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
    };

    const createDays = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = {};
        const daysArray = [];

        while (start <= end) {
            const dayKey = `day${(start - new Date(start.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24) + 1}`;
            days[dayKey] = [];
            daysArray.push(dayKey); // 총 날짜 배열에 추가
            start.setDate(start.getDate() + 1);
        }

        setSelectedPlans(days);
        setTotalDays(daysArray); // 총 날짜 업데이트
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
        console.log("sourceDay"+ sourceDay);
        console.log("destinationDay" + destinationDay);
        console.log("sourceIndex" + sourceIndex)
        console.log(destinationIndex + destinationIndex);
        let sourceArray = selectedPlans[sourceDay]; // drag 출발지 day list
        console.log(sourceArray);
        let destinationArray = selectedPlans[destinationDay]; // drag 목적지 day list
        console.log(destinationArray);

        let [element] = sourceArray.splice(sourceIndex, 1); // 드래그한 요소 추출 및 이전 day list에서의 삭제

        console.log("element" + element);

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

        console.log(selectedPlans);
    };


    /* 지도 */


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
                        <div className={`border-b-2 h-32 ps-3`}>
                            {/* 생성된 총 날짜 표시 */}
                            {totalDays.length > 0 && (
                                <div>
                                    <h2>생성된 날짜:</h2>
                                    <ul>
                                        {totalDays.map((day) => (
                                            <p key={day} onClick={() => handleDayClick(day)} style={{ cursor: 'pointer' }}>
                                                {day}
                                            </p>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className={`font-bold py-6 `}>제목을 입력해주세요</div>
                            <div className={`py-3`}>
                                <label>시작일: </label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                <label>종료일: </label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                <button onClick={createDays}>날짜 생성</button>
                            </div>
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className={`flex-grow flex flex-col overflow-y-auto overflow-hidden`} style={{flexBasis: '0'}}>
                                {Object.keys(selectedPlans).map((day) => (
                                    selectedPlans[day].length > 0 && (
                                    <Droppable key={day} droppableId={day}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps} className={`flex-col pb-3`} >
                                                <div className=" my-5 font-bold text-base"> DAY {day} </div>
                                                {selectedPlans[day].map((event, index) => (
                                                    <Draggable key={`${day}-${event.contentid}`} draggableId={`${day}-${event.contentid}`} index={index}>
                                                        {(provided) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                 className={`flex h-16 my-4 justify-center items-center px-4`}
                                                                 style={{...provided.draggableProps.style}}>
                                                                <p className={` shrink-0 w-7 mx-3 rounded-full size-7 bg-orange-600 text-white justify-center items-center flex`}>
                                                                    {index}
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
                                    <AreaList onSendData={areaSelect}/>
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
                                                <div className={`grow h-full flex flex-col align-middle text-3ml font-semibold`} >
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
                        <div
                            className={`flex  items-center absolute h-screen  z-10 w-96 left-full py-4 pl-4 transform transition-transform duration-300`}>
                            <div className={`border-2 w-full h-full bg-purple-400 flex flex-col`}>
                            </div>
                        </div>
                    )}
                </div>

                <div className={`flex-grow`}>
                    <MapComponent />
                </div>
            </div>
        </div>
    )
}

export default MakeTripPlan;
