import { useAxiosInstance } from "../../utils/axiosConfig.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TourInfo from "./TourInfo.jsx";
import AddressInfo from "../../components/travel/AddressInfo.jsx";
import Page from "../../components/travel/Page.jsx";

function TravelDetail() {
  const axiosInstance = useAxiosInstance();
  const location = useLocation();
  const { contentId, contentTypeId } = location.state;

  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [commonInfoData, setCommonInfoData] = useState({});
  const [detailInfoData, setDetailInfoData] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [reviewStarAvg, setReviewStarAvg] = useState(0);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);

  useEffect(() => {
    Promise.all([
      axiosInstance.get(`/api/place/commonInfo?contentId=${contentId}`),
      axiosInstance.get(
        `/api/place/detailInfo?contentId=${contentId}&contentTypeId=${contentTypeId}`
      ),
      axiosInstance.get(`/api/place/reviews/${contentId}?page=${page}`),
    ])
      .then(([responseData1, responseData2, responseData3]) => {
        if (
          responseData1.data.code === 200 ||
          responseData2.data.code === 200
        ) {
          setCommonInfoData(responseData1.data.data.list[0] || {});
          setDetailInfoData(responseData2.data.data.list[0] || {});
          setReviewList(responseData3.data.data || []);
          if (responseData3.data.data.length > 0) {
            setReviewStarAvg(responseData3.data.data[0].starAvg);
            setTotalCount(responseData3.data.data[0].totalCount);
          }
        }
      })
      .catch((error) => {
        console.log("요청 중 오류 발생 ", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/api/place/reviews/${contentId}?page=${page}`)
      .then((responseData) => {
        setReviewList(responseData.data.data || []);
        if (responseData.data.data.length > 0) {
          setReviewStarAvg(responseData.data.data[0].starAvg);
          setTotalCount(responseData.data.data[0].totalCount);
        }
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(totalCount / 4)) {
      setPage(newPage); // 페이지 상태 업데이트
    }
  };

  const moreViewImageOnClick = (index) => {
    console.log(index);
    console.log(selectedReviewIndex);
    setSelectedReviewIndex(selectedReviewIndex === index ? null : index);
  };

  return (
    <div className="App mx-[300px]">
      <div className="text-3xl font-bold mb-4 mt-10">
        {commonInfoData.title || "공원 이름"}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <img
            src={commonInfoData.firstimage2}
            alt={commonInfoData.title}
            className="rounded-lg shadow-md w-full object-cover h-60"
          />

          <p className="mt-4 text-gray-700 leading-relaxed">
            {commonInfoData.overview}
          </p>
        </div>

        <div>
          <AddressInfo {...commonInfoData}></AddressInfo>
          <TourInfo
            contentTypeId={contentTypeId}
            item={detailInfoData}
          ></TourInfo>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">리뷰</h2>
        <div className="text-4xl font-semibold text-yellow-500 mt-2 mb-4">
          {reviewStarAvg} ★
        </div>

        <div className="space-y-4">
          {reviewList.map((review, index) => (
            <div key={index}>
              <div className="border rounded-lg p-4 shadow-md flex space-x-4">
                <div className="flex-1">
                  {/* 별점 영역 */}
                  <div className="flex items-center space-x-1 text-yellow-500 mb-2">
                    {Array.from({ length: Math.floor(review.star) }).map(
                      (_, i) => (
                        <span key={i}>★</span>
                      )
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-sm text-gray-500">
                      {review.createDt}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{review.review}</p>
                </div>
                <img
                  src={review.reviewImg1 || ""}
                  alt={review.reviewImg1 || ""}
                  onClick={() => moreViewImageOnClick(index)}
                  className={`w-20 h-20 rounded-md ${review.reviewImg1 ? "cursor-pointer" : ""} `}
                />
              </div>
              <div
                className={`mt-8 ${selectedReviewIndex === index ? "" : "hidden"}`}
              >
                <div className="flex flex-wrap gap-4">
                  {review.reviewImg1 && (
                    <img
                      src={review.reviewImg1}
                      alt="추가 이미지"
                      className="w-[23%] object-cover rounded-lg"
                    />
                  )}
                  {review.reviewImg2 && (
                    <img
                      src={review.reviewImg2}
                      alt="추가 이미지"
                      className="w-[23%] object-cover rounded-lg"
                    />
                  )}
                  {review.reviewImg3 && (
                    <img
                      src={review.reviewImg3}
                      alt="추가 이미지"
                      className="w-[23%] object-cover rounded-lg"
                    />
                  )}
                  {review.reviewImg4 && (
                    <img
                      src={review.reviewImg4}
                      alt="추가 이미지"
                      className="w-[23%] object-cover rounded-lg"
                    />
                  )}
                </div>

                <button
                  onClick={() => setSelectedReviewIndex(null)}
                  className="text-blue-500 mt-2"
                >
                  접기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Page
        totalCount={totalCount}
        page={page}
        itemsPerPage={4}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default TravelDetail;
