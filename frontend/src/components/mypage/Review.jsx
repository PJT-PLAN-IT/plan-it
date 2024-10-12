import {useEffect, useState} from "react";
import {useAxiosInstance} from "../../utils/axiosConfig.js";
import {useParams} from "react-router-dom";
import Page from "../travel/Page.jsx";
import ReviewModal from "./ReviewModal.jsx";



function Review() {
    const {custNo} = useParams();
    const axiosInstance = useAxiosInstance();
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        fetchReviews();
    }, [page]);

    //리뷰 불러오기
    const fetchReviews = async () => {
        const response = await axiosInstance.get(`/api/my-page/reviews/${custNo}?page=${page}`);
        if(response.data.code === 200){
            setReviews(response.data.data || []);
            if(response.data.data.length > 0){
                setTotalCount(response.data.data[0].totalCount);
            }
        }
        else{
            setReviews([]);
        }
    };

    //삭제
    const deleteOnClick = async (no) => {
        try{
            const response = await axiosInstance.delete("/api/my-page/review/delete", {data : {placeReviewNo : no}});
            if(response.data.code === 200){
                alert("삭제 성공");
                if(page === 0){
                    fetchReviews();
                }
                else{
                    setPage(0);
                }
            }
            else{
                alert("삭제 실패");
            }
        }
        catch (error){
            console.log("서버오류 : " + error);
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < Math.ceil(totalCount / 7)) {
            setPage(newPage); // 페이지 상태 업데이트
        }
    };

    //수정
    const updateOnClick = async (data) => {
        console.log(data);
        const formData = new FormData();
        data.custNo = custNo;

        formData.append("placeReviewDto", new Blob([JSON.stringify(data)], { type: "application/json" }));
        data.totalImages.forEach((file, index) => {
            formData.append("files", file);  // 파일 하나씩 추가
        });

        const response = await axiosInstance.put(`/api/my-page/review/edit`, formData);
        if(response.data.status === "OK"){
            setIsModalOpen(false);
            if(page === 0){
                fetchReviews();
            }
            else{
                setPage(0);
            }
        }
    };


    // 모달 열기
    const openModal = (review) => {
        setModalData(review);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setModalData({});
    };

    return (

        <>

            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-md flex space-x-4 items-start">
                        {/* 이미지 영역 */}
                        <div className="image-container"></div>
                        <div>
                            <img src={review.reviewImg1} alt={review.reviewImg1} className="w-20 h-20 rounded-md" />
                        </div>

                        {/* 리뷰 내용 영역 */}
                        <div className="flex-1">
                            {/* 리뷰 상단: 작성자 정보와 작성일 */}
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold">{review.title}</span>
                                    <span className="text-sm text-gray-500">{review.createDt}</span>
                                    {/* 별점 영역 */}
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        {Array.from({length: Math.floor(review.star)}).map((_, i) => (
                                            <span key={i}>★</span>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* 리뷰 내용 */}
                            <p className="text-sm text-gray-700">
                                {review.review}
                            </p>
                        </div>

                        {/* 수정 및 삭제 버튼 */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => openModal(review)}
                                className="bg-orange text-white px-3 py-1 text-xs rounded">수정
                            </button>
                            <button
                                onClick={() => deleteOnClick(review.placeReviewNo)}
                                className="border border-orange text-orange px-3 py-1 text-xs rounded">삭제
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ReviewModal isOpen={isModalOpen} closeModal={closeModal} review={modalData}  updateOnClick={updateOnClick} />
            <Page page={page} totalCount={totalCount} itemsPerPage={7} handlePageChange={handlePageChange}></Page>
        </>
    );
}

export default Review;