import "../../App.css";
import "../../assets/css/Write.css";
import TextBox, { TripScroll } from "../../components/mate/TextBox";
import RegionSel from "../../components/mate/RegionSel";
import TripStyle from "../../components/mate/TripStyle";
import Calender from "../../components/mate/Calender";
import { GenderSel, AgeSel, MateNum } from "../../components/mate/AgeAndGender";
import { ThumbSelect } from "../../components/mate/PopUps";
import { RegBtnBg, CancelBtnBg } from "../../components/mate/Buttons";
import { useState, useEffect } from "react";
import { btnVal } from "../../hooks/validCheck";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DetailEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  //   const [detailData, setDetailData] = useState(location.state?.formData);

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
    findMateNoState: "",
    titleState: "",
    mateNumState: 1,
    contentState: "",
    genderState: "",
    thumbnailSel: "",
  });

  useEffect(() => {
    // Use data from location.state if it exists
    const detailsData = location.state?.formData; // Ensure to adjust according to the passed state structure
    console.log(detailsData);
    if (detailsData) {
      setFormData((prevData) => ({
        ...prevData,
        regButtonStates: {
          ...prevData.regButtonStates,
          ...Object.fromEntries(
            Object.keys(prevData.regButtonStates).map((key) => [
              key,
              detailsData.regions.includes(parseInt(key)), // Assuming regions is an array of selected region IDs
            ])
          ),
        },
        tripButtonStates: {
          ...prevData.tripButtonStates,
          ...Object.fromEntries(
            Object.keys(prevData.tripButtonStates).map((key) => [
              key,
              detailsData.tripStyles.includes(parseInt(key)), // Assuming tripStyles is an array of selected style IDs
            ])
          ),
        },
        ageButtonStates: {
          twenty: detailsData.twentyYN === "Y",
          thirty: detailsData.thirtyYN === "Y",
          forty: detailsData.fortyYN === "Y",
          fifty: detailsData.fiftyYN === "Y",
        },
        dateChangeStates: {
          startDate: detailsData.startDate,
          endDate: detailsData.endDate,
        },
        findMateNoState: detailsData.findMateNo || "",
        titleState: detailsData.title || "",
        mateNumState: detailsData.mateNum || 1,
        contentState: detailsData.content || "",
        genderState: detailsData.gender,
        thumbnailSel: detailsData.thumbnailImg,
      }));
    }
  }, [location.state]);

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

  //   const titleChange = (e) => {
  //     setFormData({ ...formData, titleState: e.target.value });
  //   };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      titleState: newTitle,
    }));
  };

  const handleMateNumChange = (event) => {
    const newMateNum = Math.max(1, Number(event.target.value)); // Ensure it is at least 1
    setFormData((prevData) => ({
      ...prevData,
      mateNumState: newMateNum, // Update the state
    }));
  };
  //   const mateNumChange = (e) => {
  //     setFormData({ ...formData, mateNumState: e.target.value });
  //   };
  //   const contentChange = (content) => {
  //     setFormData({ ...formData, contentState: content });
  //   };
  const handleContentChange = (newContent) => {
    setFormData((prevData) => ({
      ...prevData,
      contentState: newContent,
    }));
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
      findMateNo: formData.findMateNoState,
      title: formData.titleState,
      startDate: formData.dateChangeStates.startDate,
      endDate: formData.dateChangeStates.endDate,
      mateNum: formData.mateNumState,
      content: formData.contentState,
      gender: formData.genderState,
      thumbnail_img: formData.thumbnailSel,
      regions: selectedRegions,
      tripStyles: selectedTripStyles,
      twentyYN: formData.ageButtonStates.twenty ? "Y" : "N",
      thirtyYN: formData.ageButtonStates.thirty ? "Y" : "N",
      fortyYN: formData.ageButtonStates.forty ? "Y" : "N",
      fiftyYN: formData.ageButtonStates.fifty ? "Y" : "N",
    };

    console.log("sending json: ", finalFormData);

    axios
      .put("/api/mate", finalFormData, {
        headers: {
          "Content-Type": "application/json",
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
    <div className="mx-[300px]">
      <form onSubmit={handleSubmit}>
        <TripScroll />
        <TextBox
          title={formData.titleState}
          content={formData.contentState}
          titleChange={handleTitleChange}
          contentChange={handleContentChange}
        />
        <RegionSel formData={formData} regBtnClick={regBtnClick} />
        <TripStyle formData={formData} trpBtnClick={trpBtnClick} />
        <Calender
          dateChange={dateChange}
          formData={formData}
          setFormData={setFormData}
          initialDate={[
            formData.dateChangeStates.startDate,
            formData.dateChangeStates.endDate,
          ]}
        />
        <div className="flex">
          <GenderSel
            formData={formData}
            handleGenderChange={handleGenderChange}
          />
          <AgeSel
            ageButtonChange={ageButtonChange}
            ageButtonStates={formData.ageButtonStates}
          />
        </div>
        <MateNum
          mateNum={formData.mateNumState} // Pass mateNum state
          mateNumChange={handleMateNumChange} // Pass change handler
        />
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
