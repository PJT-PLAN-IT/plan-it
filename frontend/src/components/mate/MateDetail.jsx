import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export function MateDetail() {
  const [open, setOpen] = useState(false);
  const share = (
    <FontAwesomeIcon
      className="text-gray-500 text-[25px]"
      icon={faPaperPlane}
    />
  );
  const heart = (
    <FontAwesomeIcon className="text-gray-500 text-[25px]" icon={faHeart} />
  );
  return (
    <div className="p-[30px] h-[400px]  relative">
      <div className=" justify-around flex w-[5%] absolute top-4 right-6 text-xs underline">
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div>
        <div className="">
          <div className="flex justify-between mt-5">
            <h1 className="font-semibold text-base">
              서울여행 같이 할 20대 모여라~
            </h1>
            <div className=" flex justify-between w-[15%]">
              <p className="text-xs font-semibold">찐빵뿡님</p>
              <div className="flex gap-2 text-xs font-light">
                <p>2024.09.24</p>
                <p>6:32pm</p>
              </div>
            </div>
          </div>
          <div className="flex justify-evenly w-[40%] text-xs mt-2 ml-[-19px] mb-10">
            <p className="px-3 border-r-2">서울</p>
            <p className="px-3 border-r-2">축제</p>
            <p className="px-3 border-r-2">2024.10.06</p>
            <p className="px-3 border-r-2">2024.10.08</p>
            <p className="px-3 border-r-2">여자만</p>
            <p className="px-3 border-r-2">20대</p>
            <p className="px-2">30대</p>
          </div>
          <div>
            안녕하세요! 😊
            <br />
            <br />
            서울 여행을 함께할 20대 친구들을 찾고 있어요. 역사와 문화를
            좋아하고, 맛있는 음식도 함께 나누며 즐길 수 있는 분이면 좋겠어요.
            함께 서울의 아름다운 풍경을 탐험하고, 소중한 추억을 만들어보아요!
            관심 있으신 분은 연락주세요! 🏛️✨
          </div>

          <div>
            <div className="flex justify-between items-end absolute w-[90%] bottom-7 ">
              <div className="">
                <span
                  className="inline-block mr-4 "
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {share}
                </span>
                <span
                  className="inline-block mr-4 "
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {heart}
                </span>
              </div>
              <button
                className="button border border-orange text-sm "
                onClick={() => {
                  setOpen(!open);
                }}
              >
                참여자 보기
              </button>
            </div>

            <div
              className={` w-[300px] relative z-50 left-2/4 top-[50%] -translate-x-2/4 -translate-y-2/4 bg-white border-2 DropDownMenu ${
                open ? "active" : "inactive"
              }`}
            >
              <h3 className="border-b-2 text-center p-2">
                현재 참여자 수는 <b>7명 </b>중 <b>3명</b>입니다
              </h3>
              <div className="p-2">
                <p className="text-sm">지우지우님</p>
                <p className="text-sm">초코우유님</p>
                <p className="text-sm">소원님</p>
              </div>
              <div className="flex items-center justify-center mb-5">
                <button className="button on">참여하기</button>
                <button className="button gen">닫기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
