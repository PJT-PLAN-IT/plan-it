import { useState } from "react";
import "../assets/css/Header.css";
import Logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const down = <FontAwesomeIcon className="mb-[2px]" icon={faSortDown} />;
const folder = <FontAwesomeIcon icon={faFolder} />;
const airplane = <FontAwesomeIcon icon={faPaperPlane} />;
const heart = <FontAwesomeIcon icon={faHeart} />;
const env = <FontAwesomeIcon className="size-6" icon={faEnvelope} />;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="font-notosans HeaderWrap">
      <img className="w-[90px]" src={Logo} alt="logo" />
      <div className="w-[1320px] HeaderItems">
        <div className=" m-auto ml-2 HeaderNav">
          <span className="HeaderNavItem">메이트 구하기</span>
          <span className="HeaderNavItem">여행계획</span>
          <span className="HeaderNavItem">여행정보</span>
        </div>
        <div className="mr-2 UserNavWrap">
          <div
            className="UserNavBtn hover:font-semibold"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span className="mr-3">{env}</span>
            <span>사용자님 {down}</span>
          </div>
        </div>
      </div>
      <div className={`DropDownMenu ${open ? "active" : "inactive"}`}>
        <div className=" bg-white DropDownCont">
          <ul>
            <li className="DropDownItem">MENU</li>
            <DropdownMenu
              className="UnderLine"
              icon={folder}
              text={"로그아웃"}
            />
            <hr />
            <DropdownMenu icon={airplane} text={"여행관리"} />
            <hr />
            <DropdownMenu icon={folder} text={"여행 계획 작성"} />
            <DropdownMenu icon={folder} text={"나의 여행 계획 보기"} />
            <DropdownMenu icon={folder} text={"좋아요 한 여행 후기"} />
            <hr />
            <DropdownMenu icon={heart} text={"메이트 관리"} />
            <hr />
            <DropdownMenu icon={folder} text={"메이트 공고 작성하기"} />
            <DropdownMenu icon={folder} text={"나의 메이트 구하기"} />
            <DropdownMenu icon={folder} text={"메이트 신청 확인하기"} />
            <DropdownMenu icon={folder} text={"좋아요 한 메이트 글"} />
            <hr />
            <DropdownMenu icon={folder} text={"나의 리뷰 확인하기"} />
            <DropdownMenu icon={folder} text={"나의 댓글 확인하기"} />
            <hr />
            <DropdownMenu icon={folder} text={"개인 정보 수정"} />
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownMenu(props) {
  return (
    <li className="DropDownItem hover:font-semibold">
      <span>{props.icon} </span>
      {props.text}
    </li>
  );
}
