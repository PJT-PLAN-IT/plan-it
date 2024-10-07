import Sample from "../../assets/img/sample.png";
import MapImg from "../../assets/img/map.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function MyTrip() {
  return (
    <div className="flex flex-col ">
      <div className="font-semibold p-[30px] mb-10">
        <h1 className="TitleLabel">서울 여행</h1>
        <p>2024.10.06 ~ 2024.10.08</p>
      </div>
      <MyTripDay />
      <MyTripDay />
      <MyTripDay />
    </div>
  );
}

const MyTripDay = () => {
  return (
    <div className="flex ml-8 mb-20">
      <div className=" flex-3 mt-3.5 font-bold text-xl">day 1</div>
      {/* <div className="border flex-2 mx-10">
        <p className="circ">2</p>
        <p className="circ">3</p>
        <p className="circ">4</p>
      </div> */}
      <div className="flex-1 relative ">
        <div className="border-l-2 w-inherit"></div>
        <MyTripPlans />
        <MyTripPlans />
        <MyTripPlans />
        <MyTripPlans />
      </div>
    </div>
  );
};

const MyTripPlans = () => {
  const [open, setOpen] = useState(false);
  const chevdown = (
    <FontAwesomeIcon className="text-lg text-gray-400" icon={faChevronDown} />
  );
  return (
    <div
      className=" mb-5 flex gap-10"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <p className="bg-orange w-[22px] h-[22px] leading-tight text-center text-white rounded-full  ml-10 flex-6 mt-5">
        1
      </p>
      <div className="flex flex-col flex-1">
        <div className="border p-2 pl-3 rounded-sm relative ">
          <h3 className="text-sm font-semibold pb-1">강남역</h3>
          <p className="text-xs font-normal text-gray-500">
            서울 용산구 청파로 378 3층 204호
          </p>
          <i className="absolute top-4 right-7">{chevdown}</i>
        </div>
        <div
          className={`border flex py-4 justify-around DropDownMenu ${
            open ? "active" : "inactive"
          }`}
        >
          <img src={Sample} alt="sample" className="w-[50%]" />
          <div>
            <h2 className="text-sm font-semibold py-2 text-nowrap">
              카카오프렌즈 강남 플래그십 스토어
            </h2>
            <p className="text-xs mb-3">주소: 서울특별시 서초구 강남대로 429</p>
            <p className="text-xs mb-3">영업시간: 10:30 ~ 22:00</p>
            <p className="text-xs mb-3">문의 및 안내: 02-6494-1100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyTripMap = () => {
  return (
    <div>
      <img src={MapImg} alt="map" />
    </div>
  );
};

export default MyTrip;

export { MyTripDay, MyTripPlans, MyTripMap };
