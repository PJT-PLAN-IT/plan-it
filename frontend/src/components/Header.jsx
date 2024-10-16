import { useState } from "react";
import "../assets/css/Header.css";
import Logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const down = <FontAwesomeIcon className="mb-[2px]" icon={faSortDown} />;
const folder = <FontAwesomeIcon icon={faFolder} />;

export function Header() {
  const [open, setOpen] = useState(false);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const headerOnClick = (url) => {
    navigate(url);
  };

  return (
    <div className="font-notosans HeaderWrap">
      <Link to={`/planit`}>
        <img className="w-[90px]" src={Logo} alt="logo" />
      </Link>

      <div className="w-[1320px] HeaderItems">
        <div className=" m-auto ml-2 HeaderNav">
          <DropdownMenu
            className="HeaderNavItem"
            link={`/planit/mates`}
            text={"메이트 구하기"}
          />
          <DropdownMenu
            className="HeaderNavItem"
            link={`/plan`}
            text={"여행계획"}
          />
          <DropdownMenu
            className="HeaderNavItem"
            link={`/travel/info`}
            text={" 여행정보"}
          />
        </div>
        <div className="mr-2 UserNavWrap">
          <div
            className="UserNavBtn hover:font-semibold"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span>사용자님 {down}</span>
          </div>
        </div>
      </div>
      <div className={`DropDownMenu ${open ? "active" : "inactive"}`}>
        <div className=" bg-white DropDownCont z-50">
          <ul>
            <li className="DropDownItem">MENU</li>
            <DropdownMenu
              className="UnderLine"
              icon={folder}
              text={"로그아웃"}
            />
            <hr />
            <DropdownMenu text={"여행관리"} />
            <hr />
            <DropdownMenu icon={folder} text={"여행 계획 작성"} link={`/plan`}/>
            <DropdownMenu icon={folder} text={"나의 여행 계획 보기"} link={`/plan/list/${userInfo.custNo}/${new Date().getFullYear()}`} />
            {/*<DropdownMenu icon={folder} text={"좋아요 한 여행 후기"} link={`/plan`} />*/}
            <hr />
            <DropdownMenu text={"메이트 관리"} />
            <hr />
            <DropdownMenu
              icon={folder}
              text={"메이트 공고 작성하기"}
              link={"/mate"}
            />
            <DropdownMenu
              icon={folder}
              text={"나의 메이트 구하기"}
              link={`/mypage/mate/${userInfo.custNo}`}
            />
            <DropdownMenu
              icon={folder}
              text={"메이트 신청 확인하기"}
              link={`/mypage/applys/${userInfo.custNo}`}
            />
            <DropdownMenu
              icon={folder}
              text={"좋아요 한 메이트 글"}
              link={`/mypage/likes/${userInfo.custNo}`}
            />
            <hr />
            <DropdownMenu
              icon={folder}
              text={"나의 리뷰 확인하기"}
              link={`/mypage/reviews/${userInfo.custNo}`}
            />
            <DropdownMenu
              icon={folder}
              text={"나의 댓글 확인하기"}
              link={`/mypage/replys/${userInfo.custNo}`}
            />
            <hr />
            <DropdownMenu
              icon={folder}
              text={"개인 정보 수정"}
              link={`/editUserInfo/${userInfo.custNo}`}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownMenu(props) {
  return (
    <li className="DropDownItem hover:font-semibold">
      <Link to={props.link}>
        <span>{props.icon} </span>
        {props.text}
      </Link>
    </li>
  );
}
