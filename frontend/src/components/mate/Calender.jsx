import Calendar from "react-calendar";
import "../../assets/css/Calender.css";
import { useState } from "react";
import moment from "moment/moment";
export default function Calender() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className="border-t-2 border-b-2 mt-[35px] p-[30px] pb-20">
        <h1 className="mb-[35px] TitleLabel">여행 날짜:</h1>
        <Calendar
          className="w-60"
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => moment(date).format("D")}
          showNeighboringMonth={false}
          showDoubleView={true}
          showFixedNumberOfWeeks={false}
          selectRange={true}
        />
      </div>
    </div>
  );
}
