import TextBox, { TripScroll } from "../components/mate/TextBox";
import RegionSel from "../components/mate/RegionSel";
import TripStyle from "../components/mate/TripStyle";
import Calender from "../components/mate/Calender";
import { GenderSel, AgeSel, MateNum } from "../components/mate/AgeAndGender";
import { RegBtnBg, CancelBtnBg } from "../components/mate/Buttons";
import { useState } from "react";
import { btnVal } from "./validCheck";

export default function SubmitForm() {
  const [formData, setFormData] = useState({
    regButtonStates: {
      btnAl: false,
      btnSl: false,
      btnBs: false,
      btnDg: false,
      btnIc: false,
      btnGj: false,
      btnDj: false,
      btnUs: false,
      btnSj: false,
      btnGg: false,
      btnGw: false,
      btnCb: false,
      btnCn: false,
      btnKb: false,
      btnKn: false,
      btnJb: false,
      btnJn: false,
      btnJj: false,
    },
    tripButtonStates: {
      btnFr: false,
      btnTr: false,
      btnCr: false,
      btnFv: false,
      btnSp: false,
      btnFd: false,
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
  });

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

    const v1 = btnVal(regArr, regTxt);
    const v2 = btnVal(stlArr, styleTxt);
    const v3 = btnVal(datArr, datTxt);
    const v4 = btnVal(ttlArr, ttlTxt);
    const v5 = btnVal(cntArr, cntTxt);
    const v6 = btnVal(gdrArr, gdrTxt);
    const v7 = btnVal(mtnArr, mtnTxt);

    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
      return;
    }
    console.log("sending json: ", formData);

    //   fetch("http://localhost/80/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("success:", data);
    //     })
    //     .catch((error) => {
    //       console.error("error :", error);
    //     });
    // };
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
        {/* <ThumbSelect thumbSelChange={thumbSelChange} /> */}
        <div className="flex justify-center align-middle gap-10 my-[70px]">
          <RegBtnBg type="button" />
          <CancelBtnBg />
        </div>
      </form>
    </div>
  );
}
