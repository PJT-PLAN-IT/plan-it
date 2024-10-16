import {useEffect, useState} from "react";
import {useAxiosInstance} from "../../utils/axiosConfig.js";
import {useNavigate, useParams} from "react-router-dom";
import DetailPageMap from "../../components/tripplan/DetailPageMap.jsx";
import {Editor} from "@tinymce/tinymce-react";
import AddPlaceReviewModal from "../../components/tripplan/AddPlaceReviewModal.jsx";

function MyTripPlanDetail() {
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();
    const {tripPlanNo} = useParams();
    const [resultList, setResultList] = useState({
        title: '',
        startDt: '',
        endDt: '',
        thumbnailImg: '',
        review: '',
        publicYn: '',
        ownerYn: '',
        tripPlanDetailList: {}
    });
    const [reviewOpen, setReivewOpen] = useState(false);
    const [review, setReivew] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const custNo = JSON.parse(localStorage.getItem("userInfo")).custNo;
    // 장소 리뷰용
    const [tripDetailReviewObj, setTripDetailReviewObj] = useState({});

    //프론트에서 넘어오는 데이터 받는 방법
    //const Details = () => {
    //   const location = useLocation();
    //   const user = location.state;

    
    useEffect(() => {
        fetchDetail();
    }, []);

    useEffect(() => {
        checkDate();
        if (resultList.review) {
            setReivew(resultList.review);
        }
    }, [resultList]);

    const fetchDetail = async () => {
        try {
            const response = await axiosInstance.get(`/api/plan?tripPlanNo=${tripPlanNo}`);
            const resultData = response.data.data;

            let tripPlanDetailList = {};
            resultData.tripPlanDetailList.map(tripPlanDetail => {
                const key = tripPlanDetail.planDt.split('T')[0];
                let refreshData = tripPlanDetailList[key];
                if (!refreshData) {
                    refreshData = [];
                }
                refreshData.push(tripPlanDetail);

                tripPlanDetailList = {
                    ...tripPlanDetailList,
                    [key]: refreshData
                }
            });

            setResultList({
                tripPlanNo: resultData.tripPlanNo,
                title: resultData.title,
                startDt: resultData.startDt,
                endDt: resultData.endDt,
                thumbnailImg: resultData.thumbnailImg,
                review: resultData.review,
                publicYn: resultData.publicYn,
                ownerYn: resultData.ownerYn,
                tripPlanDetailList: tripPlanDetailList
            });
        } catch (error) {
            console.error('요청 실패', error);
        }
    }

    //오늘 날짜 체크
    const [isBefore, setIsBefore] = useState(false);

    const checkDate = () => {
        const today = new Date();
        const startDate = new Date(resultList.startDt);

        setIsBefore(today > startDate);
    };

    const onEditorChange = (text) => {
        setReivew(text);
    };

    const onClickReviewSave = () => {
        let saveData = {
            tripPlanNo: resultList.tripPlanNo,
            review: review
        };


        /**
         * 여행 후기 작성
         * @returns {Promise<void>}
         */
        const fetchTripPlanReviewSave = async () => {
            const response = await axiosInstance.post(`/api/plan/review`, saveData);
            const result = response.data;

            if (result.message === 'success') {
                window.location.reload();
            }
        }
        fetchTripPlanReviewSave();
    };

    /**
     * 여행 공개 설정( 개발 보류 )
     */
    const onClickPublicYn = () => {
        let saveData = {
            tripPlanNo: resultList.tripPlanNo,
            publicYn: resultList.publicYn === 'Y' ? 'N' : 'Y'
        };

        const fetchTripPlanPublicYN = async () => {
            const response = await axiosInstance.post(`/api/plan/public`, saveData);
            const result = response.data;

            if (result.message === 'success') {
                window.location.reload();
            }
        }
        fetchTripPlanPublicYN();

    };

    const goToEditPage = () => {
        // 페이지 이동2
    };

    /**
     * 딜리트
     */
    const onClickDelete = () => {
        console.log('tripPlanNo: ', resultList.tripPlanNo);
        const tripPlanNo = resultList.tripPlanNo;
        console.log("tripPlanNo", tripPlanNo);
        const fetchTripPlanDelete = async () => {
            try {
                await axiosInstance.delete(`/api/plan?tripPlanNo=${tripPlanNo}`);
                alert("삭제되었습니다!");
            }catch (error){
                console.log(error);
            }
        }
        fetchTripPlanDelete();
        navigate(`/plan/list/${custNo}/${new Date().getFullYear()} `);

    };

    const onClickAddPlaceReview = (item) => {
        console.log('item: ', item);
        setTripDetailReviewObj(item);
        setIsOpenModal(true);
    };

    const saveReviewModal = async (props) => {
        let saveData = {
            ...props,
            tripDetailNo: tripDetailReviewObj.tripDetailNo,
            custNo: JSON.parse(localStorage.getItem("userInfo")).custNo,
            contentid: tripDetailReviewObj.contentid
        };

        const formData = new FormData();
        formData.append("placeReviewDto", new Blob([JSON.stringify(saveData)], {type: "application/json"}));

        if (saveData.totalImages) {
            saveData.totalImages.forEach((file) => {
                formData.append("files", file);
            });
        }

        console.log("saveData: ", saveData);

        if (saveData.placeReviewNo) {
            const response = await axiosInstance.put('/api/place-review', formData);
            const result = response.data;
            if (result.message === "already registered") {
                alert("이미 리뷰를 작성하였습니다!");
            }
            if (result.message === "unauthorized user") {
                alert("로그인 정보를 다시 확인해주세요!");
            }
            if (result.message === "success") {
                alert("리뷰 등록 완료!");
                fetchDetail();
            }
        } else {
            const response = await axiosInstance.post('/api/place-review', formData);
            const result = response.data;
            if (result.message === "already registered") {
                alert("이미 리뷰를 작성하였습니다!");
            }
            if (result.message === "unauthorized user") {
                alert("로그인 정보를 다시 확인해주세요!");
            }
            if (result.message === "success") {
                alert("리뷰 등록 완료!");
                fetchDetail();
            }
        }
    };

    const closeReviewModal = () => {
        setIsOpenModal(false);
    };

    return (
        <div className={`App mx-[300px]`}>
            <div className={`mt-10 flex items-baseline justify-between`}>
                <div className={`flex items-baseline`}>
                    <h1 className={`text-xl font-bold mb-10 mt-10`}>
                        {resultList.title}
                    </h1>
                    <h1 className={`ml-10 text-sm`}>
                        {resultList.startDt.split("T")[0]} ~ {resultList.endDt.split("T")[0]}
                    </h1>
                </div>
                {isBefore === false && (
                    <button className={`bg-orange on p-2 rounded float-right text-sm`}
                                onClick={() => navigate('/mate',{state: resultList.tripPlanNo})}>
                        메이트 구하기
                    </button>
                )}
                {isBefore === true && !resultList.review && (
                    <button
                        className={`bg-orange on p-2 rounded float-right text-sm`}
                        onClick={() => setReivewOpen(!reviewOpen)}
                    >
                        여행 일기 작성하기
                    </button>
                )}
                {/*{isBefore === true && resultList.review  (*/}
                {/*    <button*/}
                {/*        className={`bg-orange on p-2 rounded float-right text-sm`}*/}
                {/*        onClick={() => onClickPublicYn()}*/}
                {/*    >*/}
                {/*        여행 후기 비공개*/}
                {/*    </button>*/}
                {/*)}*/}
            </div>

            {
                !reviewOpen && resultList.review && (
                    <div className={`mt-10 flex justify-between`}>
                        {resultList.review}
                        <button
                            className={`bg-orange text-white p-3 rounded-lg px-5`}
                            onClick={() => setReivewOpen(!reviewOpen)}
                        >
                            리뷰 수정
                        </button>
                    </div>
                )
            }
            {
                reviewOpen && (
                    <div className={`mt-10 flex justify-between`}>
                        <Editor
                            apiKey="xrrohkv0t2zqx94m985ll5nay89i4r3tppwr17zjeg2igtg6"
                            onEditorChange={text => onEditorChange(text)}
                            value={review}
                            init={{
                                forced_root_block: "",
                                force_br_newlines: true,
                                force_p_newlines: false,
                                plugins: [
                                    // Core editing features
                                    "anchor",
                                    "autolink",
                                    "charmap",
                                    "codesample",
                                    "emoticons",
                                    "image",
                                    "link",
                                    "lists",
                                    "media",
                                    "searchreplace",
                                    "visualblocks",
                                ],
                                height: 600,
                                elementpath: false,
                                toolbar:
                                    "blocks fontfamily fontsize | bold italic underline strikethrough | link table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | ",
                                tinycomments_mode: "embedded",
                                menubar: "",
                                mergetags_list: [
                                    {value: "First.Name", title: "First Name"},
                                    {value: "Email", title: "Email"},
                                ],
                                ai_request: (request, respondWith) =>
                                    respondWith.string(() =>
                                        Promise.reject("See docs to implement AI Assistant")
                                    ),
                            }}
                            initialValue={resultList.review ? resultList.review : ""}
                        />
                        <div className={`flex justify-center items-center align-middle mb-20 space-x-20`}>
                            <button
                                className={`bg-orange text-white p-3 rounded-lg px-5`}
                                onClick={() => onClickReviewSave()}
                            >
                                리뷰 저장
                            </button>
                        </div>
                    </div>
                )
            }

            {Object.keys(resultList.tripPlanDetailList).map((date, index) => (
                <div key={date} className={`p-4 flex`}>
                    <div className={`w-32 p-4 flex-none`}>
                        <div className={`font-bold mb-1`}>day {index + 1}</div>
                        <p className={`text-xs`}>{date}</p>
                    </div>
                    <div className={`p-4  flex-1  flex-col space-y-7 `}>
                        {resultList.tripPlanDetailList[date].map((item, index) => (
                            <div key={index} className={`flex justify-center items-center`}>
                                <p className={`shrink-0 w-7 mx-3 rounded-full size-7 bg-orange text-white justify-center  items-center flex`}>
                                    {index + 1}
                                </p>
                                <div
                                    className={`grow h-full flex flex-col float-right text-3ml border border-gray-200 rounded-lg mx-3 p-3`}>
                                    <p className={`font-bold text-sm pb-2`}>{item.title}</p>
                                    <p className={`text-xs`}>{item.address}</p>
                                </div>

                                {item.placeReviewNo == null && (
                                    <button
                                        className={` border border-orange rounded-lg text-xs text-orange p-1`}
                                        onClick={() => onClickAddPlaceReview(item)}
                                    >
                                        리뷰작성
                                    </button>
                                )}
                                {item.placeReviewNo != null && (
                                    <button
                                        className={` border border-orange rounded-lg text-xs text-orange p-1`}
                                        onClick={() => onClickAddPlaceReview(item)}
                                    >
                                        리뷰수정
                                    </button>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className={`flex w-full h-[600px] border-gray-200 border-2 my-36`}>
                <DetailPageMap planCoordinate={resultList.tripPlanDetailList}/>
            </div>

            <div className={`flex justify-center items-center align-middle mb-20 space-x-20`}>
                <button
                    className={`bg-orange text-white p-3 rounded-lg px-5`}
                    onClick={() => goToEditPage()}
                >
                    수정하기
                </button>
                <button
                    className={`border-2 border-orange text-orange p-3 rounded-lg px-5`}
                    onClick={() => onClickDelete()}
                >
                    삭제하기
                </button>
            </div>

            {
                isOpenModal && (
                    <AddPlaceReviewModal data={tripDetailReviewObj} onSave={saveReviewModal} onClose={closeReviewModal}/>
                )
            }
        </div>
    )
}

export default MyTripPlanDetail;