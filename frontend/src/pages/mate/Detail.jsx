import "../../App.css";
import "../../assets/css/Write.css";
import { Header } from "./components/Header";
import { MateDetail } from "./components/MateDetail";
import { Calender } from "./components/Calender";
import { RegionSel } from "./components/RegionSel";
import { TripStyle } from "./components/TripStyle";
import { AgeAndGender } from "./components/AgeAndGender";
import { MateNum } from "./components/AgeAndGender";
import MyTrip from "./components/MyTrip";
import { MyTripMap } from "./components/MyTrip";
import { MateReqBtn } from "./components/Buttons";
import { MateCnlBtn } from "./components/Buttons";
import { AddComment } from "./components/Comments";
import { ShowComment } from "./components/Comments";

export default function Detail() {
  return (
    <div className="App mx-[300px]">
      <Header />
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
