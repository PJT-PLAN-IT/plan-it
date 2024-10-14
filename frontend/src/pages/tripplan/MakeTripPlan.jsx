import {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable,} from 'react-beautiful-dnd';
import AreaList from "../../components/tripplan/SelectArea.jsx";
import SelectContentTypeId from "../../components/tripplan/SelectContentTypeId.jsx";
import MapComponent from "../../components/tripplan/MapComponent.jsx";
import Calendar from "react-calendar";
import {useAxiosInstance} from "../../utils/axiosConfig.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faCirclePlus, faTrashCan, faXmark} from "@fortawesome/free-solid-svg-icons";
import {addHours} from "date-fns";


function MakeTripPlan() {
    const left = <FontAwesomeIcon icon={faAngleLeft}/>;
    const right = <FontAwesomeIcon icon={faAngleRight}/>
    const trash = <FontAwesomeIcon icon={faTrashCan}/>
    const xmark = <FontAwesomeIcon icon={faXmark}/>
    const circlePlus = <FontAwesomeIcon icon={faCirclePlus}/>

    const axiosInstance = useAxiosInstance();

    const [searchBody, setSearchBody] = useState({
        "pageNo": 1,
        "numOfRows": 10,
        "arrange": "A",
        "contentTypeId": '',
        "areaCode": '',
        "keyword": ''
    });
    const [searchResultList, setSearchResultList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageGroup, setCurrentPageGroup] = useState(0);

    // 페이징 관련
    const startPage = currentPageGroup * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    const handlePageChange = (page) => {
        setSearchBody(prevState => ({
            ...prevState,
            pageNo: page
        }));
        setCurrentPage(page);
    };

    const handlePrev = () => {
        if (currentPageGroup > 0) {
            setCurrentPageGroup(currentPageGroup - 1);
        }
    }

    const handleNext = () => {
        if (currentPageGroup < Math.floor((totalPages - 1) / 5)) {
            setCurrentPageGroup(currentPageGroup + 1);
        }
    }

    useEffect(() => {
        fetchSearchData();
    }, [currentPage]);

    const fetchSearchData = async () => {
        try {
            const response = await axiosInstance.post(`/api/open-api/place/search`, searchBody);
            setSearchResultList(response.data.data.list);
            setTotalPages(Math.ceil(response.data.data.totalCount / 10));
        } catch (error) {
            console.error('서버 요청 실패', error);
        }
    };

    const onClickSearch = () => {

        if (currentPageGroup !== 0) {
            setCurrentPageGroup(0);
        }
        if (currentPage !== 1) {
            handlePageChange(1);
        } else {
            fetchSearchData();
        }

    };

    const [title, setTitle] = useState("");
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeKeyword = (e) => {
        setSearchBody(prevState => ({
            ...prevState,
            keyword: e.target.value
        }))
    }



    /* 저장하기 */
    const onClickSave = async () => {
        if (!JSON.parse(localStorage.getItem("userInfo")).custNo) {
            alert("로그인 정보를 확인하세요.");
            return;
        }
        if (title === "") {
            alert("제목을 입력해주세요.");
            return;
        }
        if (dateRange === null || dateRange.length < 2) {
            alert("여행 기간을 선택해주세요.");
            return;
        }
        let plansCount = 0;
        for (const [value] of Object.entries(selectedPlans)) {
            if (value.length === 0) {
                plansCount++;
            }
        }
        if (Object.keys(selectedPlans).length === 0 || Object.keys(selectedPlans).length === plansCount) {
            alert("여행 계획을 추가해주세요.");
            return;
        }

        let tripPlanDetailList = [];
        const offset = 1000 * 60 * 60 * 9;

        for (const [key, value] of Object.entries(selectedPlans)) {
            for (const index in value) {
                const data = value[index];
                let requestData = {
                    planDt: addHours(new Date(key), 9),
                    seq: index,
                    contentid: data.contentid,
                    contentTypeId: data.contenttypeid,
                    placeTitle: data.title,
                    address: data.addr1 + " " + data.addr2,
                    mapx: data.mapx,
                    mapy: data.mapy,
                };
                tripPlanDetailList.push(requestData);
            }
        }

        const saveData = {
            "custNo": JSON.parse(localStorage.getItem("userInfo")).custNo,
            "title": title,
            "startDt": addHours(new Date(dateRange[0]), 9),
            "endDt": addHours(new Date(dateRange[1]), 9),
            "publicYn": "N",
            "tripPlanDetailList": tripPlanDetailList
        };

        console.log(saveData);

        try {
            await axiosInstance.post(`/api/plan`, saveData);
            // 페이지 이동
        } catch (error) {
            console.error('서버 요청 실패', error);
        }
    }


    const selectArea = (data) => {
        setSearchBody(prevState => ({
            ...prevState,
            areaCode: data.value
        }))
        goClickCoord(data.mapy, data.mapx, 6);
    }

    const contentTypeSelect = (data) => {
        setSearchBody(prevState => ({
            ...prevState,
            contentTypeId: data
        }))
    }

    /* 모달관련 */
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(true); //계획 짜는 모달
    const [searchBtn, setSearchBtn] = useState(true); //검색버튼
    const [selectContent, setSelectContent] = useState(false); // 검색 결과 중 하나 선택했을 때 화면 띄움

    const toggleModal = () => {
        setIsPlanModalOpen(prev => !prev);
    };

    const togglePlaceModal = () => {
        setSearchBtn(prev => !prev)
    }


    /* 지도 */
    const updatePlanCoord = (newMapy, newMapx) => {
        goClickCoord(newMapy, newMapx, 3);
    };
    const [clickCoord, setClickCoord] = useState({mapy: '37.5664056', mapx: '126.9778222', level: '6'});
    const goClickCoord = (mapy, mapx, level) => {
        setClickCoord({mapy, mapx, level});
    };

    /* 여행 계획 추가 관련*/
    const [selectedPlans, setSelectedPlans] = useState({}); // 초기 상태는 빈 객체
    const [currentDay, setCurrentDay] = useState(''); // 현재 선택된 day 상태 추가

    const addPlanList = (event, day) => {
        if (!currentDay) {
            alert("먼저 날짜를 선택해주세요");
            return;
        }

        setSelectedPlans(prevState => ({
            ...prevState,
            [day]: prevState[day] ? [...prevState[day], event] : [event]
        }));
        updatePlanCoord(event.mapy, event.mapx);
    };

    /*여행 계획 삭제*/
    function deletePlan(numb, day) {
        setSelectedPlans(prevState => ({
            ...prevState,
            [day]: [
                ...selectedPlans[day].slice(0, numb),
                ...selectedPlans[day].slice(numb + 1)
            ]
        }));
    }


    const handleDayClick = (day) => {
        setCurrentDay(day); // 클릭한 날짜로 현재 선택된 day 업데이트
    };

    /* 드래그 앤 드롭 */
    const onDragEnd = (result) => {
        if (!result.destination) return;  // 아이템이 드롭된 위치가 없을 경우 드래그 종료

        const {source, destination} = result; //result 값을 받기 위한 구조분해할당

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
    const [dateRange, setDateRange] = useState([null, null]);
    const [showCalendar, setShowCalendar] = useState(false);
    const selectDate = (range) => {
        if (!range[0] || !range[1]) return;

        if (JSON.stringify(selectedPlans) !== '{}') {
            const result = window.confirm("날짜를 변경하시겠습니까? (지금까지 짠 계획들이 사라져요!)");
            if (result) {
                setSelectedPlans({});
            } else {
                setShowCalendar(false);
                return;
            }
        }

        setDateRange(range);
        setShowCalendar(false);

        const start = new Date(range[0]);
        const end = new Date(range[1]);
        let days = [new Date(start).toLocaleDateString()];
        console.log('hi')
        while (start.getDate() < end.getDate()) {
            // 할일 1 : 날짜가 10-30 ~11/1 이렇게 달이 넘어가면 에러 뜸 잡아야 함.
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
                {/* 할일 2   삭제 하기 버튼 추가 뒤로가기 / 삭제하기 버튼 추가 */}
                </div>
            </div>
            <div className={`flex grow`}>
                <div
                    className={`flex items-center absolute z-10 w-96 h-full transform transition-transform duration-300 ${isPlanModalOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className={` w-96 h-screen flex flex-col bg-white border border-amber-700`}>
                        <div className={`border-b-2 h-32 px-3`}>
                            <input className={`font-bold py-4 mt-2 w-full`} placeholder={`제목을 입력해주세요.`} value={title}
                                   maxLength={15} onChange={e => onChangeTitle(e)}/>
                            <div className={`py-3 inline-flex`}>
                                <h1 onClick={toggleCalendar}>
                                    {dateRange[0] && dateRange[1]
                                        ? `${dateRange[0].toLocaleDateString()} ~ ${dateRange[1].toLocaleDateString()}`
                                        : "여행 기간을 선택해주세요"}
                                </h1>
                            </div>

                            {showCalendar && (
                                <div className={`absolute z-50 size-full`}>
                                    <Calendar
                                        onChange={selectDate}
                                        value={dateRange}
                                        selectRange={true}
                                        className="cursor-pointer"/>
                                </div>
                            )}
                        </div>

                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className={`flex-grow flex flex-col overflow-y-auto overflow-hidden`}
                                 style={{flexBasis: '0'}}>
                                {Object.keys(selectedPlans).map((day, index) => (
                                    selectedPlans[day] && (
                                        <Droppable key={day} droppableId={day}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps}
                                                     className={`flex-col pb-3`}>
                                                    <div className="flex my-5 font-bold text-base w-full">
                                                        <h1>DAY {index + 1}</h1>
                                                        <h1 className={`flex items-center mx-5 font-light text-sm`}>{day}</h1>
                                                        <button
                                                            className={` items-center align-middle font-light text-xs border border-gray-300 rounded-lg p-1`}
                                                            onClick={() => handleDayClick(day)}
                                                            style={{cursor: 'pointer'}}> 계획추가
                                                        </button>
                                                    </div>
                                                    {selectedPlans[day].map((event, numb) => (
                                                        <Draggable key={`${day}-${event.contentid}-${numb}`}
                                                                   draggableId={`${day}-${event.contentid}-${numb}`}
                                                                   index={numb}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                    className={`flex h-16 my-4 justify-center items-center px-4`}
                                                                    style={{...provided.draggableProps.style}}>
                                                                    <p className={` shrink-0 w-7 mx-3 rounded-full size-7 bg-orange text-white justify-center items-center flex`}>
                                                                        {numb + 1}
                                                                    </p>
                                                                    <div
                                                                        className={`grow flex border border-gray-200 h-full items-center px-4 rounded-lg `}>
                                                                        <div
                                                                            className={`grow h-full flex items-center text-3ml font-semibold`}>
                                                                            {event.title}
                                                                        </div>
                                                                        <i className={`shrink-0 w-5 `}
                                                                           onClick={() => deletePlan(numb, day)}> {trash}</i>
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
                        <button className={`on flex h-14 my-5 mx-3 justify-center items-center bg-[#FB6134] rounded-lg`}
                                onClick={onClickSave}>
                            저장하기
                        </button>
                    </div>


                    {!searchBtn && (
                        <button className={`absolute left-full bg-blue-500 text-white py-4 z-10 rounded-r-lg`}
                                onClick={toggleModal}>

                            {isPlanModalOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                    </svg>
                                // {left}
                                ) :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                </svg>
                                //{right}
                            }
                        </button>
                    )}

                    {searchBtn && (
                        <div
                            className={`flex absolute h-screen  z-10 w-96 left-96 py-4 pl-4 transform transition-transform duration-300`}>
                            <div
                                className={`relative flex flex-col border border-[#FB6134] w-full h-full bg-white rounded-lg`}>
                                <AreaList onSendData={selectArea}/>
                                <SelectContentTypeId onSendData={contentTypeSelect}/>
                                <input type={"text"}
                                       className={`border border-gray-200 rounded-lg mx-3 my-5 py-3 px-2`}
                                       placeholder={`여행지를 검색해보세요!`}
                                       onChange={onChangeKeyword}
                                />
                                <button
                                    className={`on flex h-14 my-5 mx-3 justify-center items-center bg-[#FB6134] rounded-lg`}
                                    onClick={onClickSearch}>
                                    검색
                                </button>
                                <div className={`flex-1 flex-col overflow-y-auto overflow-hidden`}>
                                    <div>
                                        {searchResultList.map((item) => (
                                            <div key={item.contentid}
                                                 className={`flex h-auto my-4 justify-center items-center px-4 mx-4 border-2 border-gray-200 rounded-lg`}>
                                                <div
                                                    className={`grow h-full flex flex-col align-middle text-3ml font-semibold`}
                                                    onClick={() => goClickCoord(item.mapy, item.mapx, 6)}>
                                                    <div
                                                        className={`grow h-full flex items-center text-3ml font-bold py-3`}>
                                                        {item.title}
                                                    </div>
                                                    <div
                                                        className={`pb-3 text-xs font-light`}>{item.addr1} {item.addr2 && `(${item.addr2})`}</div>
                                                </div>
                                                <i className={`w-4 shrink-0 px justify-center items-center flex fa-lg`}
                                                   onClick={() => addPlanList(item, currentDay)}
                                                   style={{cursor: 'pointer'}}>
                                                    {circlePlus}
                                                </i>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-center my-10">
                                        <div className="flex justify-center ">
                                            <button
                                                className={`mr-2`}
                                                onClick={handlePrev}
                                                disabled={currentPageGroup === 0}
                                            >
                                                {left}
                                            </button>
                                            <div className="flex gap-5 ">
                                                {Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`on p-2 rounded-lg w-9 flex justify-center align-middle ${page === currentPage ? 'bg-orange' : `bg-gray-200`}  `}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                className={`ml-2`}
                                                onClick={handleNext}
                                                disabled={endPage === totalPages}
                                            >
                                                {right}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className={`absolute top-0 right-0 text-zinc-800 text-2xl z-10 px-3.5 py-2`}
                                        onClick={togglePlaceModal}>
                                    {xmark}
                                </button>

                            </div>
                        </div>
                    )
                        }

                    {selectContent && (
                        // 할일 3 상세보기 페이지 추가
                        <div
                            className={`flex  items-center absolute h-screen  z-10 w-96 left-full py-4 pl-4 transform transition-transform duration-300`}>
                            <div className={`border-2 w-full h-full bg-purple-400 flex flex-col`}>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`flex-grow`}>
                    <MapComponent planCoordinate={selectedPlans} searchMap={clickCoord}/>
                </div>
            </div>
        </div>
    )
}

export default MakeTripPlan;