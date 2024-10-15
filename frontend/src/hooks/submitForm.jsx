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
import TripDetails from "../components/mate/TripDetails";
function SubmitForm() {
  const { token } = useAuth();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const navigate = useNavigate();
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
    selectedTrip: null,
    tripPlanList: [],
    tripPlanDetailList: [],
  });

  const custNo = JSON.parse(localStorage.getItem("userInfo")).custNo;

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        const response = await axios.get(
          `/api/mate/tripplans?custNo=${custNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const extractedTripPlans = response.data.data
          .filter((tripPlan) => tripPlan.public_yn === "Y")
          .map((tripPlan) => ({
            tripPlanNo: tripPlan.trip_plan_no,
            title: tripPlan.title,
            startDt: tripPlan.start_dt,
            endDt: tripPlan.end_dt,
          }));

        setFormData((prevData) => ({
          ...prevData,
          tripPlanList: extractedTripPlans,
        }));

        console.log("Fetched Trip Plans: ", extractedTripPlans);
      } catch (error) {
        console.error(
          "Error fetching trip plans:",
          error.response ? error.response.data : error.message
        );
      }
    };

    // Fetch trip plans only once when component is mounted
    fetchTripPlans();

    // The empty array ensures this only runs once
  }, [custNo, token]);
  // useEffect(() => {
  //   axios
  //     .get(`/api/mate/tripplans?custNo=${custNo}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       const extractedTripPlans = response.data.data
  //         .filter((tripPlan) => tripPlan.public_yn === "Y")
  //         .map((tripPlan) => ({
  //           tripPlanNo: tripPlan.trip_plan_no,
  //           title: tripPlan.title,
  //           startDt: tripPlan.start_dt,
  //           endDt: tripPlan.end_dt,
  //         }));

  //       setFormData((prevData) => ({
  //         ...prevData,
  //         tripPlanList: extractedTripPlans,
  //       }));
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Error fetching trip plans:",
  //         error.response ? error.response.data : error.message
  //       );
  //     });
  // }, []);

  useEffect(() => {
    if (formData.selectedTrip) {
      // Clear previous trip details before fetching new ones
      setFormData((prevData) => ({
        ...prevData,
        tripPlanDetailList: [], // Reset the trip details
      }));

      axios
        .get(
          `/api/mate/tripdetails?tripPlanNo=${formData.selectedTrip.tripPlanNo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setFormData((prevData) => ({
            ...prevData,
            tripPlanDetailList: response.data.data, // Update tripPlanDetailList in formData
          }));
        })
        .catch((error) => {
          console.error(
            "Error fetching trip details:",
            error.response ? error.response.data : error.message
          );
        });
    }
  }, [formData.selectedTrip, token]);

  // Handle trip selection
  const handleSelectedTripUpdate = (trip) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedTrip: trip, // Update selectedTrip in formData
    }));
  };

  // Handle trip details update (if needed)
  const handleTripDetailsUpdate = (details) => {
    setFormData((prevData) => ({
      ...prevData,
      tripPlanDetailList: details, // Update tripPlanDetailList in formData
    }));
  };

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
      tripPlanNo: formData.selectedTrip.tripPlanNo,
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
  // console.log(formData.tripPlanDetailList.data);
  // const groupedByDate = formData?.data?.tripPlanDetails?.reduce(
  //   (acc, detail) => {
  //     const date = detail.planDt; // Assuming 'date' is the field for the trip date
  //     if (!acc[date]) {
  //       acc[date] = []; // Initialize an array for this date if it doesn't exist
  //     }
  //     acc[date].push(detail);
  //     return acc;
  //   },
  //   {}
  // );
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TripScroll
          tripPlanList={formData.tripPlanList}
          onSelectedTripUpdate={handleSelectedTripUpdate}
        />
        <TextBox
          formData={formData}
          setFormData={setFormData}
          titleChange={titleChange}
          contentChange={contentChange}
        />
        {formData.tripPlanDetailList.length > 0 && (
          <TripDetails
            tripDetails={formData.tripPlanDetailList}
            selectedTrip={formData.selectedTrip}
          />
        )}

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
