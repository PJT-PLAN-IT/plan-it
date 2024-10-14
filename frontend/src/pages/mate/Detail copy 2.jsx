import "../../App.css";
import "../../assets/css/Write.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Regions } from "../../data/regions";
import { TripStyles } from "../../data/tripStyle";
import { genderInfo } from "../../data/gender";
import { MyTripPlans, MyTripMap } from "../../components/mate/MyTrip";
import { MateReqBtn, MateCnlBtn } from "../../components/mate/Buttons";
import { CommentForm, ShowComment } from "../../components/mate/Comments";

export default function Detail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const findMateNo = queryParams.get("findMateNo");
  const [formDetails, setFormDetails] = useState({ data: null });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data for findMateNo:", findMateNo);
    if (findMateNo) {
      axios
        .get(`/api/planit/mates/details?findMateNo=${findMateNo}`)
        .then((response) => {
          console.log("Detail Response:", JSON.stringify(response.data));
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

  const share = (
    <FontAwesomeIcon
      className="text-gray-500 text-[25px]"
      icon={faPaperPlane}
    />
  );
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
      const date = detail.planDt; // Assuming 'date' is the field for the trip date
      if (!acc[date]) {
        acc[date] = []; // Initialize an array for this date if it doesn't exist
      }
      acc[date].push(detail);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-[300px]">
      <div>
        {formDetails.data ? (
          <div className="p-[30px] h-[400px]  relative">
            <div className=" justify-around flex w-[5%] absolute top-4 right-6 text-xs underline">
              <button onClick={editDetail}>수정</button>
              <button>삭제</button>
            </div>
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
                    <div className="flex gap-2 text-xs font-light">
                      <p>{formDetails.data.findMateCreateDate.slice(0, 10)}</p>
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
                    {formDetails.data.startDate.slice(0, 10)}-{" "}
                    {formDetails.data.endDate.slice(0, 10)}
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
                        {share}
                      </span>
                      <span
                        className="inline-block mr-4 "
                        onClick={() => {
                          setOpen(!open);
                        }}
                      >
                        {heart}
                      </span>
                    </div>
                    <button
                      className="button border border-orange text-sm "
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      참여자 보기
                    </button>
                  </div>

                  <div
                    className={` w-[300px] relative z-50 left-2/4 top-[50%] -translate-x-2/4 -translate-y-2/4 bg-white border-2 DropDownMenu ${
                      open ? "active" : "inactive"
                    }`}
                  >
                    <h3 className="border-b-2 text-center p-2">
                      현재 참여자 수는 <b>{formDetails.data.mateNum}</b>명 중
                      <b>2</b>명 입니다
                    </h3>
                    <div className="p-2">
                      <p className="text-sm">지우지우님</p>
                      <p className="text-sm">초코우유님</p>
                      <p className="text-sm">소원님</p>
                    </div>
                    <div className="flex items-center justify-center mb-5">
                      <button className="button on">참여하기</button>
                      <button className="button gen">닫기</button>
                    </div>
                  </div>
                </div>
              </div>

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
                      {/* Display the date */}
                      <h2 className="text-2xl font-bold mt-4">
                        day {index + 1}
                      </h2>

                      {/* Sort each group by seq and display the details */}
                      {groupedByDate[date]
                        .sort((a, b) => a.seq - b.seq) // Sort by sequence within each date group
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
                  {/* {formDetails.data.tripPlanDetails
                    .sort((a, b) => {
                      if (a.date < b.date) return -1; // Compare by date
                      if (a.date > b.date) return 1;
                      return a.seq - b.seq; // If date is the same, compare by seq
                    })
                    .map((detail) => (
                      <div key={detail.tripDetailNo}>
                        <div className=" flex-3 mt-3.5 font-bold text-xl">
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
                    ))} */}
                </div>
              </div>
              <MyTripMap />
              <div className="flex justify-center align-middle gap-10 my-[70px]">
                <MateReqBtn />
                <MateCnlBtn />
              </div>
              <CommentForm />
              <div className="my-20">
                <h1 className="border-b-2 p-2">
                  댓글 <b>{formDetails.data.mateReplyList.length}</b>
                </h1>

                {formDetails.data.mateReplyList.map((reply) => {
                  return (
                    <ShowComment
                      key={reply.find_mate_reply_no}
                      name={reply.cust_no}
                      reply={reply.reply}
                      date={reply.date}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}