import Logo from "../../assets/img/logo.png";
import Img1 from "../../assets/img/img1.jpg";
import Img2 from "../../assets/img/img2.jpg";
import Img3 from "../../assets/img/img3.jpg";
import Img4 from "../../assets/img/img4.jpg";
import Img5 from "../../assets/img/img5.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export function Alert() {
  const check = (
    <FontAwesomeIcon className="text-[60px] text-orange" icon={faCircleCheck} />
  );
  return (
    <div className="my-[450px] w-[400px] relative z-50 left-2/4 top- -translate-x-2/4 -translate-y-2/4 bg-white border-2">
      <div className=" flex flex-col justify-center items-center pt-5">
        <i>{check}</i>
        <img className="w-[100px]" src={Logo} alt="" />
      </div>
      <h3 className="text-2xl font-bold text-center ">
        공고 작성이 완료 되었습니다
      </h3>

      <p className="text-sm text-center mt-2 font-light">
        저장된 공고는 마이페이지에서 확인이 가능합니다
      </p>

      <div className="flex items-center justify-center mb-5">
        <button className="px-10 py-2 rounded-lg on mt-4">확인</button>
      </div>
    </div>
  );
}

export function ThumbSelect() {
  const camera = <FontAwesomeIcon icon={faCamera} />;
  return (
    <div className="w-[700px] border-2 flex-col flex justify-center items-center">
      <div>
        <img className="w-[100px]" src={Logo} alt="" />
      </div>
      <h1 className="text-3xl mb-10 font-medium">썸네일을 선택해주세요</h1>
      <div className="ml-12 flex flex-wrap w-[90%] gap-4 ">
        <img className="w-[30%]" src={Img1} alt="img" />
        <img className="w-[30%]" src={Img2} alt="img" />
        <img className="w-[30%]" src={Img3} alt="img" />
        <img className="w-[30%]" src={Img4} alt="img" />
        <img className="w-[30%]" src={Img5} alt="img" />
        <div className="w-[30%] bg-gray-400 text-center">이미지 없음</div>
      </div>
      <button className="text-lg font-medium my-5 border border-gray-950 px-16 py-2">
        {camera} 직접 썸네일 올리기
      </button>
      <div className="flex justify-center items-center">
        <img className=" w-[40%]" src={Img3} alt="img" />
      </div>
      <button className="my-10 px-10 py-2 rounded-lg on ">저장하기</button>
    </div>
  );
}

export function ShareLink() {
  const url = window.location.href;
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("링크가 복사되었습니다");
      })
      .catch((err) => {
        console.error("링크 복사에 실패하였습니다", err);
      });
  };
  return (
    <div className="border-2 w-[20vw] h-[24vh]">
      <img className="w-[100px] ml-5" src={Logo} alt="logo" />
      <div className="ml-7">
        <input className="border min-w-[250px] p-1" type="text" value={url} />
        <button
          className="border py-1 px-4 bg-gray-100"
          onClick={copyToClipboard}
        >
          복사
        </button>
      </div>
      <div className=" flex justify-center gap-5">
        <button className="my-10 px-7 py-2 rounded-lg on ">확인</button>
        <button className="my-10 px-7 py-2 rounded-lg gen">닫기</button>
      </div>
    </div>
  );
}
