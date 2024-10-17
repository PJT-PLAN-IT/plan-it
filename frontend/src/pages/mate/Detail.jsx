import "../../App.css";
import "../../assets/css/Write.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { genderInfo } from "../../data/gender";
import { Regions } from "../../data/regions";
import { TripStyles } from "../../data/tripStyle";
import { MyTripPlans, MyTripMap } from "../../components/mate/MyTrip";
import { useAuth } from "../../context/AuthContext";
import CommentSection from "../../components/mate/DetailComment";
import axios from "axios";
import { MateApplyBtn } from "../../hooks/MateApplyBtn";
import DetailPageMap from "../../components/tripplan/DetailPageMap.jsx";
// import DetailPageMap from "../../components/tripplan/DetailPageMap";

export default function Detail() {
  const { token } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const findMateNo = queryParams.get("findMateNo");
  const [formDetails, setFormDetails] = useState({ data: null });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;

  useEffect(() => {
    if (findMateNo) {
      axios
        .get(`/api/planit/mates/details?findMateNo=${findMateNo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { tripPlanList, tripPlanDetailList, mateReplyList } =
            response.data.data;

          setFormDetails({
            data: {
              ...response.data.data,
              tripPlan: tripPlanList[0] || {},
              tripPlanDetails: tripPlanDetailList || [],
              mateReplies: mateReplyList || [],
            },
          });
        })
        .catch((error) => {
          console.error("Error fetching form details:", error);
        });
    }
  }, [findMateNo]);

  // console.log(formDetails.tripPlanDetails);

  const heart = (
    <FontAwesomeIcon className="text-gray-500 text-[25px]" icon={faHeart} />
  );

  const editDetail = () => {
    if (formDetails.data) {
      navigate("/mate/edit", { state: { formData: formDetails.data } });
    }
  };

  const groupedByDate = formDetails?.data?.tripPlanDetails?.reduce(
    (acc, detail) => {
      const date = detail.planDt;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(detail);
      return acc;
    },
    {}
  );

  const deleteDetail = (findMateNo) => {
    if (findMateNo) {
      axios
        .delete(`/api/mate?findMateNo=${findMateNo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(alert("공고가 삭제되었습니다."), navigate("/planit/mates"))
        .catch((error) => {
          alert("공고 삭제를 실패하였습니다. 다시 시도해주세요");
          console.error("Error fetching form details:", error);
        });
    }
  };

  return (
    <div className="mx-[300px]">
      <div>
        {formDetails.data ? (
          <div className="p-[30px] h-[400px]  relative">
            {userEmail == formDetails.data.findMateCreateBy ? (
              <div className=" justify-around flex w-[5%] absolute top-4 right-6 text-xs underline">
                <button onClick={editDetail}>수정</button>
                <button onClick={() => deleteDetail(findMateNo)}>삭제</button>
              </div>
            ) : (
              ""
            )}
            <div>
              <div className="">
                <div className="flex justify-between mt-5">
                  <h1 className="font-semibold text-base">
                    {formDetails.data.title}
                  </h1>
                  <div className=" flex justify-between w-[15%]">
                    <p className="text-xs font-semibold">
                      {formDetails.data.custName}님
                    </p>
                    <a></a>
                    <div className="flex gap-2 text-xs font-light">
                      <p>{formDetails.data.findMateCreateDate}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly min-w-[30%] max-w-[50%] flex-wrap text-xs mt-2 ml-[-19px] mb-10">
                  {formDetails.data.regions.map((region) => {
                    const regionVar = Regions.find((r) => r.key == region);
                    return (
                      <p key={regionVar.key} className="px-3 border-r-2">
                        {regionVar.value}
                      </p>
                    );
                  })}

                  {formDetails.data.tripStyles.map((style) => {
                    const styleVar = TripStyles.find((s) => s.key == style);
                    return (
                      <p key={styleVar.key} className="px-3 border-r-2">
                        {styleVar.value}
                      </p>
                    );
                  })}
                  <p className="px-3 border-r-2">
                    {formDetails.data.startDate}- {formDetails.data.endDate}
                  </p>
                  {genderInfo
                    .filter((gender) => gender.key === formDetails.data.gender)
                    .map((gender) => (
                      <p key={gender.key} className="px-3 border-r-2">
                        {gender.name}
                      </p>
                    ))}
                  {formDetails.data.twentyYN == "Y" ? (
                    <p className="px-3 border-r-2">#20대</p>
                  ) : null}
                  {formDetails.data.thirtyYN == "Y" ? (
                    <p className="px-3 border-r-2">#30대</p>
                  ) : null}
                  {formDetails.data.fortyYN == "Y" ? (
                    <p className="px-3 border-r-2">#40대</p>
                  ) : null}
                  {formDetails.data.fiftyYN == "Y" ? (
                    <p className="px-3 border-r-2">#50대 이상</p>
                  ) : null}
                </div>
                <div>
                  <div
                    className="min-h-[20vh]"
                    dangerouslySetInnerHTML={{
                      __html: formDetails.data.content,
                    }}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-end  bottom-7 h-[5vh] ">
                    <div className="">
                      <span
                        className="inline-block mr-4 "
                        onClick={() => {
                          setOpen(!open);
                        }}
                      >
                        {heart}
                      </span>
                    </div>
                    <CheckTripMate
                      tripPlanNo={formDetails.data.tripPlan.trip_plan_no}
                      formDetails={formDetails}
                    />
                  </div>
                </div>
              </div>
              {formDetails.data.tripPlan != null ? (
                <>
                  <div className="flex flex-col pt-10">
                    <div className="font-semibold p-[30px] mb-10 border-t-2">
                      <h1 className="TitleLabel">
                        {formDetails.data.tripPlan.title}
                      </h1>
                      <p>
                        {formDetails.data.tripPlan.start_dt} to
                        <span> </span>
                        {formDetails.data.tripPlan.end_dt}
                      </p>
                    </div>
                    <div className="flex-col ml-8 mb-20 ">
                      {Object.keys(groupedByDate).map((date, index) => (
                        <div key={index} className="pb-5">
                          <h2 className="text-2xl font-bold mt-4">
                            day {index + 1}
                          </h2>

                          {groupedByDate[date]
                            .sort((a, b) => a.seq - b.seq)
                            .map((detail) => (
                              <div key={detail.tripDetailNo}>
                                <div className="flex-3 mt-3.5 font-bold text-xl">
                                  {detail.content}
                                </div>
                                <div className="flex-1 relative">
                                  <MyTripPlans
                                    title={detail.title}
                                    address={detail.address}
                                    seq={detail.seq}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`flex w-full h-[600px] border-gray-200 border-2 my-36`}>
                    <DetailPageMap planCoordinate={groupedByDate} />
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="flex justify-center align-middle gap-10 my-[70px]">
                <MateApplyBtn
                  findMateNo={findMateNo}
                  startDate={formDetails.data.startDate}
                  expiredDate={formDetails.data.endDate}
                  tripPlanNo={formDetails.data.tripPlan.trip_plan_no}
                />
              </div>
              <CommentSection findMateNo={findMateNo} />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

const CheckTripMate = ({ tripPlanNo, formDetails }) => {
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/mate/participate/getMateNum?tripPlanNo=${tripPlanNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenClick = () => {
    setOpen(!open);
    if (!open) {
      fetchParticipants();
    }
  };

  return (
    <div>
      <button
        className="button border border-orange text-sm"
        onClick={handleOpenClick}
      >
        참여자 보기
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setOpen(false)} // Clicking on overlay closes the popup
        ></div>
      )}
      <div
        className={`popup z-50 bg-white border-2 DropDownMenu ${
          open ? "block" : "hidden"
        }`}
      >
        <h3 className="border-b-2 text-center p-2">
          현재 참여자 수는 <b>{formDetails.data.mateNum}</b>명 중
          <b>{participants.length}</b>명 입니다
        </h3>

        <div className="p-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            participants.map((participant, index) => (
              <p className="text-sm" key={index}>
                {participant.name}
              </p>
            ))
          )}
        </div>

        <div className="flex items-center justify-center mb-5">
          <button className="button gen" onClick={() => setOpen(false)}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
