import { useState, useEffect } from "react";
import axios from "axios";
// import { MateReqBtn, MateCnlBtn } from "../components/mate/Buttons";
import { useAuth } from "../context/AuthContext";

export function MateApplyBtn({
  findMateNo,
  startDate,
  expiredDate,
  tripPlanNo,
}) {
  const [applyMateInfo, setApplyMateInfo] = useState("");
  const { token } = useAuth();
  const userNo = JSON.parse(localStorage.getItem("userInfo")).custNo;
  useEffect(() => {
    const fetchApplyMateInfo = async () => {
      try {
        const response = await axios.get(
          `/api/mate/participate?findMateNo=${findMateNo}&custNo=${userNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplyMateInfo(response.data.data);
      } catch (error) {
        console.error("Error getting apply info: ", error);
      }
    };

    fetchApplyMateInfo();
  }, [findMateNo, userNo, token]);

  const infoExist = applyMateInfo == true;
  return (
    <div>
      {infoExist ? (
        <MateCnlBtn
          findMateNo={findMateNo}
          startDate={startDate}
          expiredDate={expiredDate}
          setApplyMateInfo={setApplyMateInfo}
          tripPlanNo={tripPlanNo}
        />
      ) : (
        <MateReqBtn
          findMateNo={findMateNo}
          startDate={startDate}
          expiredDate={expiredDate}
          setApplyMateInfo={setApplyMateInfo}
        />
      )}
    </div>
  );
}

const useApplyMate = (setApplyMateInfo) => {
  const { token } = useAuth();
  const userNo = JSON.parse(localStorage.getItem("userInfo")).custNo;

  const applyMate = async (findMateNo, startDate, expiredDate) => {
    const applyInfo = {
      findMateNo: Number(findMateNo),
      custNo: userNo,
      applyDt: startDate,
      expiredDt: expiredDate,
    };

    try {
      const response = await axios.post("/api/mate/participate", applyInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 200) {
        setApplyMateInfo(true);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return applyMate;
};

const useCancelMate = (setApplyMateInfo) => {
  const { token } = useAuth();
  const userNo = JSON.parse(localStorage.getItem("userInfo")).custNo;

  const cancelMate = async (findMateNo, tripPlanNo) => {
    const cancelInfo = {
      findMateNo: Number(findMateNo),
      custNo: userNo,
      tripPlanNo: tripPlanNo,
    };

    try {
      const response = await axios.post(
        "/api/mate/participate/cancel",
        cancelInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        setApplyMateInfo(false);
      }
    } catch (error) {
      console.error("Error sending cancellation request:", error);
    }
  };

  return cancelMate;
};

const MateReqBtn = ({
  findMateNo,
  startDate,
  expiredDate,
  setApplyMateInfo,
}) => {
  const applyMate = useApplyMate(setApplyMateInfo);
  return (
    <div>
      <button
        className="button on big"
        onClick={() => applyMate(findMateNo, startDate, expiredDate)}
      >
        여행 참여 신청
      </button>
    </div>
  );
};

const MateCnlBtn = ({ findMateNo, setApplyMateInfo, tripPlanNo }) => {
  const cancelMate = useCancelMate(setApplyMateInfo);
  return (
    <div>
      <button
        className="button gen big"
        onClick={() => cancelMate(findMateNo, tripPlanNo)}
      >
        여행 참여 취소
      </button>
    </div>
  );
};
