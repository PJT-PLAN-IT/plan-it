import TextBox, { TripScroll } from "../components/mate/TextBox";
import RegionSel from "../components/mate/RegionSel";
import TripStyle from "../components/mate/TripStyle";
import Calender from "../components/mate/Calender";
import { GenderSel, AgeSel, MateNum } from "../components/mate/AgeAndGender";
import { ThumbSelect } from "../components/mate/PopUps";
import { RegBtnBg, CancelBtnBg } from "../components/mate/Buttons";
import { useState, useEffect } from "react";
import { btnVal } from "./validCheck";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SubmitForm() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    regButtonStates: {
      0: false,
      1: false,
      6: false,
      4: false,
      2: false,
      5: false,
      3: false,
      7: false,
      8: false,
      31: false,
      32: false,
      33: false,
      34: false,
      35: false,
      36: false,
      37: false,
      38: false,
      39: false,
    },
    tripButtonStates: {
      10: false,
      721: false,
      13: false,
      321: false,
      12: false,
      131: false,
    },

    ageButtonStates: {
      twenty: false,
      thirty: false,
      forty: false,
      fifty: false,
    },

    dateChangeStates: {
      startDate: "",
      endDate: "",
    },
    titleState: "",
    mateNumState: 1,
    contentState: "",
    genderState: "",
    thumbnailSel: "",
    tripPlanList: [],
    tripPlanDetailList: [],
  });

  const navigate = useNavigate();

  const custNo = JSON.parse(localStorage.getItem("userInfo")).custNo;
  useEffect(() => {
    axios
      .get(`/api/mate/tripPlans?custNo=${custNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const tripPlanList = response.data.tripPlanList || [];
        const tripPlanDetailList = response.data.tripPlanDetailList || [];

        if (tripPlanList.length > 0) {
          const tripPlan = tripPlanList[0];

          console.log("Fetched Trip Plan:", tripPlan);
          console.log("Fetched Trip Plan Details:", tripPlanDetailList);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching trip plans:",
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  function regBtnClick(btnState) {
    setFormData((prev) => ({
      ...prev,
      regButtonStates: {
        ...prev.regButtonStates,
        [btnState]: !prev.regButtonStates[btnState],
      },
    }));
  }
  function trpBtnClick(tripState) {
    setFormData((prev) => ({
      ...prev,
      tripButtonStates: {
        ...prev.tripButtonStates,
        [tripState]: !prev.tripButtonStates[tripState],
      },
    }));
  }
  const thumbSelChange = (data) => {
    setFormData({ ...formData, thumbnailSel: data });
    console.log(data);
  };

  const titleChange = (e) => {
    setFormData({ ...formData, titleState: e.target.value });
  };

  const mateNumChange = (e) => {
    setFormData({ ...formData, mateNumState: e.target.value });
  };
  const contentChange = (content) => {
    setFormData({ ...formData, contentState: content });
  };

  const dateChange = (startDate, endDate) => {
    setFormData({
      ...formData,
      dateChangeStates: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  };

  const handleGenderChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      genderState: e.target.value,
    }));
  };

  function ageButtonChange(btnState) {
    setFormData((prev) => ({
      ...prev,
      ageButtonStates: {
        ...prev.ageButtonStates,
        [btnState]: !prev.ageButtonStates[btnState],
      },
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const regArr = Object.values(formData.regButtonStates);
    const stlArr = Object.values(formData.tripButtonStates);
    const datArr = Object.values(formData.dateChangeStates);
    const ttlArr = formData.titleState;
    const cntArr = formData.contentState;
    const gdrArr = formData.genderState;
    const mtnArr = formData.mateNumState;

    const regTxt = "지역";
    const styleTxt = "여행 스타일";
    const datTxt = "날짜";
    const ttlTxt = "제목";
    const cntTxt = "내용";
    const gdrTxt = "성별";
    const mtnTxt = "모집인원수";

    const v4 = btnVal(ttlArr, ttlTxt);
    const v5 = btnVal(cntArr, cntTxt);
    const v1 = btnVal(regArr, regTxt);
    const v2 = btnVal(stlArr, styleTxt);
    const v3 = btnVal(datArr, datTxt);
    const v6 = btnVal(gdrArr, gdrTxt);
    const v7 = btnVal(mtnArr, mtnTxt);

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
      return;
    }

    const selectedRegions = Object.entries(formData.regButtonStates)
      .filter(([key, value]) => value)
      .map(([key]) => parseInt(key));

    const selectedTripStyles = Object.entries(formData.tripButtonStates)
      .filter(([key, value]) => value)
      .map(([key]) => parseInt(key));

    const finalFormData = {
      title: formData.titleState,
      startDate: formData.dateChangeStates.startDate,
      endDate: formData.dateChangeStates.endDate,
      mateNum: formData.mateNumState,
      content: formData.contentState,
      gender: formData.genderState,
      thumbnail: formData.thumbnailSel,
      regions: selectedRegions,
      tripStyles: selectedTripStyles,
      twentyYN: formData.ageButtonStates.twenty ? "Y" : "N",
      thirtyYN: formData.ageButtonStates.thirty ? "Y" : "N",
      fortyYN: formData.ageButtonStates.forty ? "Y" : "N",
      fiftyYN: formData.ageButtonStates.fifty ? "Y" : "N",
    };

    console.log("sending json: ", finalFormData);

    axios
      .post("/api/mate", finalFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJ5ZSIsImlhdCI6MTcyODgyNTY4OCwiZXhwIjoxNzI4ODI5Mjg4fQ.LXDaXlJzlInhm5TrYxo_ZjgwI1ZImggKJmb4h0KVdIg",
        },
      })
      .then((response) => {
        // console.log("success", response.data);
        const findMateNo = response.data.data;
        navigate(`/planit/mates/details?findMateNo=${findMateNo}`);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TripScroll />
        <TextBox
          formData={formData}
          setFormData={setFormData}
          titleChange={titleChange}
          contentChange={contentChange}
        />
        <RegionSel formData={formData} regBtnClick={regBtnClick} />
        <TripStyle formData={formData} trpBtnClick={trpBtnClick} />
        <Calender
          dateChange={dateChange}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="flex">
          <GenderSel
            formData={formData}
            handleGenderChange={handleGenderChange}
          />
          <AgeSel ageButtonChange={ageButtonChange} />
        </div>
        <MateNum mateNumChange={mateNumChange} />
        <ThumbSelect
          thumbSelChange={thumbSelChange}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="flex justify-center align-middle gap-10 my-[70px]">
          <RegBtnBg type="button" />
          <CancelBtnBg />
        </div>
      </form>
    </div>
  );
}

export default SubmitForm;
