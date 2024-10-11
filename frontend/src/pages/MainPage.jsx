import { useEffect, useState } from "react";
import banner from "../assets/img/banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FaPlus } from "react-icons/fa";

const MainPage = () => {
  const [matesLike, setMatesLike] = useState([]);
  const [newestPlace, setNewestPlace] = useState([]);

  useEffect(() => {
    fetch("api/planit/")
      .then((response) => response.json())
      .then((data) => MainPage(data));

    // fetch("/api/planit/mates-like")
    //   .then((response) => response.json())
    //   .then((data) => setMatesLike(data));

    // fetch("/api/planit/newest-place")
    //   .then((response) => response.json())
    //   .then((data) => setNewestPlace(data));
  }, []);

  return (
    <div className="main-page mx-[300px]">
      <SearchBar />
      <Banner />
      <Section title="인기 많은 메이트글" items={matesLike} />
      <Section title="최신 관광 컨텐츠" items={newestPlace} />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center bg-white py-3 px-8 rounded-full shadow-lg mt-10 mb-6 ">
        <div className="text-lg font-semibold text-gray-900">
          여행 계획 만들기
        </div>

        <div className="flex items-center space-x-8 ">
          <div className="flex flex-col border-l border-r px-5">
            <label className="text-lg font-semibold text-gray-700">
              여행지
            </label>
            <input
              type="text"
              placeholder="여행지를 검색"
              className="outline-none focus:border-gray-600 text-gray-500 w-48"
            />
          </div>

          <div className="flex flex-col border-r pr-5">
            <label className="text-lg font-semibold text-gray-700">
              여행 시작
            </label>
            <input
              type="text"
              placeholder="날짜 추가"
              className=" outline-none focus:border-gray-600 text-gray-500 w-48"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-lg font-semibold text-gray-700">
              여행 마지막
            </label>
            <input
              type="text"
              placeholder="날짜 추가"
              className="outline-none focus:border-gray-600 text-gray-500 w-48"
            />
          </div>
        </div>

        <button className="ml-4 bg-orange text-white p-4 rounded-full ">
          <FaPlus size={20} />
        </button>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="Banner" className="banner-image" />
    </div>
  );
};

const Section = ({ title, items }) => {
  const right = <FontAwesomeIcon icon={faCircleRight} />;
  return (
    <section className="section border-2 h-[40vh] py-[30px]">
      <h2 className="font-semibold flex w-[200px] justify-between pl-7">
        {title}
        <span className="text-orange"> {right}</span>
      </h2>
      <div className="grid-container">
        {items.map((item, index) => (
          <PostCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

const PostCard = ({ item }) => {
  return (
    <div className="">
      <img src={item.thumbnail} alt={item.title} className="post-image" />
      <h3>{item.title}</h3>
      <p>{item.location}</p>
    </div>
  );
};

export default MainPage;
