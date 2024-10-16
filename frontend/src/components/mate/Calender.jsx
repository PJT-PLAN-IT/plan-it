import Calendar from "react-calendar";
import "../../assets/css/Calender.css";
import { useState, useEffect } from "react";
import moment from "moment/moment";

export default function Calender({ dateChange, initialDate }) {
  const [date, setDate] = useState([null, null]);

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
  }, [initialDate]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (Array.isArray(selectedDate)) {
      const [startDate, endDate] = selectedDate;
      dateChange(startDate, endDate); // Pass the dates to parent component
    } else {
      dateChange(selectedDate, null); // If not a range, just pass the selected date
    }
  };

  return (
    <div>
      <div className="border-t-2 border-b-2 mt-[35px] p-[30px] pb-20">
        <h1 className="mb-[35px] TitleLabel">여행 날짜:</h1>
        <Calendar
          className=""
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("D")}
          showNeighboringMonth={false}
          showDoubleView={true}
          showFixedNumberOfWeeks={false}
          selectRange={true}
          firstDate={date[0]}
          endDate={date[1]}
          value={date}
        />
      </div>
    </div>
  );
}
