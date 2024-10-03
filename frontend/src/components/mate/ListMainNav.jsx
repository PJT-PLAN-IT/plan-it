import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import RegionSel from "../mate/RegionSel";
import TripStyle from "../mate/TripStyle";
import AgeAndGender from "../mate/AgeAndGender";
import Calender from "../mate/Calender";
import { CloseBtnBg, ConfirmBtnBg } from "../mate/Buttons";

function ListMainNav() {
  const [open, setOpen] = useState(false);
  const search = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  const filter = <FontAwesomeIcon icon={faSliders} />;

  return (
    <>
      <div className="p-4 flex w-[100%] justify-between mt-5">
        <div className="flex justify-around gap-10 items-center">
          <h1 className="text-2xl font-semibold">메이트 구하기</h1>
          <button className=" border-2 border-orange text-orange p-1 px-3 rounded-lg font-semibold">
            작성하기
          </button>
        </div>
        <div className=" flex w-[40%] justify-between ">
          <div className="flex gap-2 w-[400px]">
            <input
              className="border-2 w-[300px] p-1 rounded-lg"
              type="text"
              placeholder="제목을 입력하세요"
            />
            <button className="border-2 p-1 px-3 rounded-lg  border-orange text-orange">
              {search}
            </button>
          </div>
          <button
            className="mr-10 border-2 p-1 px-2 rounded-lg text-gray-500"
            onClick={() => {
              setOpen(!open);
            }}
          >
            필터 <i>{filter}</i>
          </button>
        </div>
      </div>
      <div className={`DropDownMenu ${open ? "active" : "inactive"}`}>
        <SearchFilter />
      </div>
    </>
  );
}

const SearchFilter = () => {
  return (
    <div className=" z-50 overflow-y-scroll  overflow-x-hidden absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 w-[900px] h-[1000px]">
      <div className=" bg-white w-[900px] h-[1400px] ">
        <form>
          <RegionSel />
          <TripStyle />
          <Calender />
          <AgeAndGender />
          <div className="mr-10 flex gap-5 justify-center items-center">
            <ConfirmBtnBg />
            <CloseBtnBg />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListMainNav;
export { SearchFilter };
