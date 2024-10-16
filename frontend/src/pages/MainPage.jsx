import { useEffect, useState } from "react";
import banner from "../assets/img/banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainPage = () => {
  const [matesLike, setMatesLike] = useState([]);
  const [newestPlace, setNewestPlace] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    Promise.all([
      axios.get("/api/planit/newest-place", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get("/api/planit/mates-like", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
      .then(([responseData1, responseData2]) => {
        console.log(responseData1.data.data.list, responseData2.data.data);
        if (
          responseData1.data.code === 200 ||
          responseData2.data.code === 200
        ) {
          setNewestPlace(responseData1.data.data.list || {});
          setMatesLike(responseData2.data.data || {});
        }
      })
      .catch((error) => {
        console.error("Error fetching form details:", error);
      });
  }, [token]);
  return (
    <div className="main-page mx-[300px]">
      <Banner />
      <SectionMate title="인기 많은 메이트글" matesLike={matesLike} />
      <SectionPlace title="최신 관광 컨텐츠" newestPlace={newestPlace} />
    </div>
  );
};

// const SearchBar = () => {
//   return (
//     <div className="relative">
//       <div className="flex justify-between items-center bg-white py-3 px-8 rounded-full shadow-lg mt-10 mb-6 ">
//         <div className="text-lg font-semibold text-gray-900">
//           여행 계획 만들기
//         </div>

//         <div className="flex items-center space-x-8 ">
//           <div className="flex flex-col border-l border-r px-5">
//             <label className="text-lg font-semibold text-gray-700">
//               여행지
//             </label>
//             <input
//               type="text"
//               placeholder="여행지를 검색"
//               className="outline-none focus:border-gray-600 text-gray-500 w-48"
//             />
//           </div>

//           <div className="flex flex-col border-r pr-5">
//             <label className="text-lg font-semibold text-gray-700">
//               여행 시작
//             </label>
//             <input
//               type="text"
//               placeholder="날짜 추가"
//               className=" outline-none focus:border-gray-600 text-gray-500 w-48"
//             />
//           </div>

//           <div className="flex flex-col ">
//             <label className="text-lg font-semibold text-gray-700">
//               여행 마지막
//             </label>
//             <input
//               type="text"
//               placeholder="날짜 추가"
//               className="outline-none focus:border-gray-600 text-gray-500 w-48"
//             />
//           </div>
//         </div>

//         <button className="ml-4 bg-orange text-white p-4 rounded-full ">
//           <FaPlus size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner" className="banner-image" />
    </div>
  );
};

const SectionPlace = ({ title, newestPlace }) => {
  const navigate = useNavigate();
  const right = <FontAwesomeIcon icon={faCircleRight} />;

  const viewTravel = () => {
    navigate("/travel/info");
  };

  const onClickCard = (contentId, contentTypeId) => {
    console.log(contentId, contentTypeId);
    navigate("/travel/detail", {
      state: { contentId: contentId, contentTypeId: contentTypeId },
    });
  };
  return (
    <section
      className="section h-[40vh] py-[30px] hover:cursor-pointer "
      onClick={viewTravel}
    >
      <h2 className="font-semibold flex w-[260px] justify-between pl-5 text-2xl ">
        {title}

        <span className="text-orange "> {right}</span>
      </h2>
      <div className="grid-container flex items-center justify-evenly  py-10  ">
        {newestPlace.map((item, index) => (
          <PostCard key={index} item={item} onClickCard={onClickCard} />
        ))}
      </div>
    </section>
  );
};

const SectionMate = ({ title, matesLike }) => {
  const navigate = useNavigate();

  const viewMate = () => {
    navigate("/planit/mates");
  };

  const right = <FontAwesomeIcon icon={faCircleRight} />;

  const onClickMate = (findMateNo) => {
    navigate(`/planit/mates/details?findMateNo=${findMateNo}`, {
      state: { findMateNo: findMateNo },
    });
  };
  return (
    <section className="section h-[40vh] py-[30px] mt-10" onClick={viewMate}>
      <h2 className="font-semibold flex w-[265px] justify-between pl-4 text-2xl ">
        {title}
        <span className="text-orange"> {right}</span>
      </h2>
      <div className="grid-container flex items-center justify-evenly py-10">
        {matesLike.length > 0 ? (
          matesLike.map((item, index) => (
            <PostCard2 key={index} item={item} onClickMate={onClickMate} />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </section>
  );
};

const PostCard = ({ item, onClickCard }) => {
  return (
    <div
      style={{ backgroundImage: `url(${item.firstimage2})` }}
      className={` rounded-lg border-2 bg-cover bg-center relative overflow-hidden`}
      onClick={() => onClickCard(item.contentid, item.contenttypeid)}
    >
      {" "}
      <img src="" alt="" />
      <div className=" rounded-lg w-[220px] h-[220px] z-10 bg-black opacity-50"></div>
      <div className=" z-20 absolute top-0 p-4 w-[100%] h-[100%] bg-opacity-65">
        <h1 className="text-lg my-4 font-semibold text-white absolute bottom-2">
          {item.title}
        </h1>
      </div>
    </div>
  );
};
const PostCard2 = ({ item, onClickMate }) => {
  return (
    <div
      className={` rounded-lg bg-cover bg-center relative overflow-hidden self-center justify-self-center `}
      onClick={() => onClickMate(item.findMateNo)}
    >
      <div
        style={{ backgroundImage: `url(${item.thumbnailImg})` }}
        className={` rounded-lg border-2 bg-cover bg-center relative overflow-hidden w-[220px] h-[220px]`}
      >
        <div className=" rounded-lg w-[220px] h-[220px] z-10 bg-black opacity-40"></div>
      </div>
      <div className="text-white z-20 absolute top-0 p-4 w-[100%] h-[100%] ">
        <div className="flex justify-between">
          <p className="text-sm ">{item.name}</p>
        </div>
        <p className="font-light text-sm my-2">
          {item.startDt} ~ {item.endDt}
        </p>
        <h1 className="text-xl my-24 font-semibold overflow-hidden">
          {item.title}
        </h1>
      </div>
    </div>
  );
};

export default MainPage;

export { PostCard2, SectionMate };
{
  /* <div
className="aspect-square border-2 overflow-hidden justify-evenly p-2 "
onClick={() => onClickCard(item.contentid, item.contenttypeid)}
>
<h3 className="z-20 text-white absolute">{item.title}</h3>
<div className="w-[100%] h-[100%] rounded-lg z-10 bg-black opacity-20"></div>
<img
  src={item.firstimage2}
  alt={item.title}
  className="rounded-lg object-cover h-[100%] z-0 "
/>
<p>{item.contentid}</p>
</div> */
}
