import "../../App.css";
import "../../assets/css/Write.css";
import { TripScroll } from "./components/TextBox";
import { Textbox } from "./components/TextBox";
import { Header } from "./components/Header";
import { Calender } from "./components/Calender";
import { RegionSel } from "./components/RegionSel";
import { TripStyle } from "./components/TripStyle";
import { AgeAndGender } from "./components/AgeAndGender";
import { MateNum } from "./components/AgeAndGender";
import { RegBtnBg } from "./components/Buttons";
import { CancelBtnBg } from "./components/Buttons";

export default function Write() {
  return (
    <div className="App mx-[300px]">
      <Header />
      <TripScroll />
      <Textbox />
      <RegionSel />
      <TripStyle />
      <Calender />
      <AgeAndGender />
      <MateNum />
      <div className="flex justify-center align-middle gap-10 my-[70px]">
        <RegBtnBg />
        <CancelBtnBg />
      </div>
    </div>
  );
}
