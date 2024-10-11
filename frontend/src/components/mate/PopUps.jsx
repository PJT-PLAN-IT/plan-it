import Logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Alert = () => {
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
};

const ThumbSelect = ({ thumbSelChange }) => {
  const [file, setFile] = useState(null);
  const camera = <FontAwesomeIcon icon={faCamera} />;

  const imgArr = [
    { img: "https://imgur.com/EhF3mMd.jpg", key: "img1 " },
    { img: "https://imgur.com/4JI6FE7.jpg", key: "img2" },
    { img: "https://imgur.com/H4Y6H6u.jpg", key: "img3" },
    { img: "https://imgur.com/j98DCIf.jpg", key: "img4" },
    { img: "https://imgur.com/sFynFpK.jpg", key: "img5" },
    { img: "https://imgur.com/cyL7WCh.jpg", key: "img6" },
  ];

  const imageClick = (e) => {
    setFile(e.target.src);
    thumbSelChange(file);
    console.log(file);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitImage = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("썸네일을 선택하거나 파일을 올려주세요");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      const imageUrl = await response.text();
      console.log("Image URL:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className=" flex-col flex justify-center ">
      <div>
        <h1 className="text-3xl mb-10 font-medium mt-10">
          썸네일을 선택해주세요
        </h1>
        <div className=" flex flex-wrap gap-4 justify-evenly items-center">
          {imgArr.map((img) => (
            <div
              className="w-[10%] object-cover overflow-hidden border-2"
              key={img.key}
            >
              <img
                className=""
                src={img.img}
                alt="img"
                key={img.key}
                onClick={imageClick}
              />
            </div>
          ))}
        </div>
        <div className="flex h-9 items-center mt-10">
          <h1 className="text-lg font-medium my-5  px-16 py-2 ">
            {camera} 직접 썸네일 올리기:
          </h1>
          <input
            type="file"
            className="border-2 border-gray inline-block"
            accept=".jpg, .png"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-center items-center"></div>
        <button
          type="button"
          className="my-10 px-10 py-2 rounded-lg on "
          onClick={submitImage}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

const ShareLink = () => {
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
};

export { ShareLink, ThumbSelect, Alert };
