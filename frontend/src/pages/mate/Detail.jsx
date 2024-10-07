import "../../App.css";
import "../../assets/css/Write.css";
import MateDetail from "../../components/mate/MateDetail";
import Calender from "../../components/mate/Calender";
import RegionSel from "../../components/mate/RegionSel";
import TripStyle from "../../components/mate/TripStyle";
import AgeAndGender from "../../components/mate/AgeAndGender";
import { MateNum } from "../../components/mate/AgeAndGender";
import MyTrip from "../../components/mate/MyTrip";
import { MyTripMap } from "../../components/mate/MyTrip";
import { MateReqBtn } from "../../components/mate/Buttons";
import { MateCnlBtn } from "../../components/mate/Buttons";
import { AddComment } from "../../components/mate/Comments";
import { ShowComment } from "../../components/mate/Comments";

export default function Detail() {
  return (
    <div>
      <MateDetail />
      <RegionSel />
      <TripStyle />
      <Calender />
      <AgeAndGender />
      <MateNum />
      <MyTrip />
      <MyTripMap />
      <div className="flex justify-center align-middle gap-10 my-[70px]">
        <MateReqBtn />
        <MateCnlBtn />
      </div>
      <AddComment />
      <ShowComment />
    </div>
  );
}
