import "../../App.css";
import "../../assets/css/Write.css";
import MainSlider from "../../components/mate/MainSlider";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Regions } from "../../data/regions";
import { TripStyles } from "../../data/tripStyle";
import axios from "axios";

export default function MateList() {
  const { token } = useAuth();
  const [mates, setMates] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  console.log(localStorage.getItem("userInfo"));
  const left = (
    <FontAwesomeIcon icon={faCircleChevronLeft} className="text-3xl" />
  );
  const right = (
    <FontAwesomeIcon icon={faCircleChevronRight} className="text-3xl" />
  );
  useEffect(() => {
    fetchMates();
  }, [page]);

  const fetchMates = async () => {
    try {
      const response = await axios.get(
        `/api/planit/mates?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMates(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching mate list", error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const onClickMate = (findMateNo) => {
    navigate(`/planit/mates/details?findMateNo=${findMateNo}`, {
      state: { findMateNo: findMateNo },
    });
  };
  console.log(mates);
  return (
    <div className="mx-[300px]">
      <MainSlider />

      <section className="section h-[40vh] py-[30px] ">
        <div className="flex justify-between mb-20">
          <h2 className="font-semibold flex w-[260px] justify-between pl-5 text-3xl ">
            메이트 공고
          </h2>
          {userInfo ? (
            <Link to={"/mate"}>
              <button className="border-orange border-2 px-2 py-1 rounded-lg text-orange font-semibold mr-5">
                작성하기
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className=" flex flex-wrap gap-10 justify-center ">
          {mates.map((mate) => (
            <PostCard3
              key={mate.findMateNo}
              item={mate}
              onClickMate={onClickMate}
              startDate={
                mate.startDt ? mate.startDt.toString().slice(0, 10) : ""
              }
              endDate={mate.endDt ? mate.endDt.toString().slice(0, 10) : ""}
            />
          ))}
        </div>

        <div className=" py-10 flex justify-evenly items-center text-orange font-semibold ">
          <button onClick={handlePreviousPage} disabled={page === 0}>
            {left}
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages - 1}>
            {right}
          </button>
        </div>
      </section>
    </div>
  );
}

const PostCard3 = ({ item, onClickMate, startDate, endDate }) => {
  console.log(item);
  return (
    <div
      className={` rounded-lg bg-cover bg-center relative overflow-hidden self-center justify-self-center `}
      onClick={() => onClickMate(item.findMateNo)}
    >
      <div
        style={{ backgroundImage: `url(${item.thumbnailImg})` }}
        className={` rounded-lg border-2 bg-cover bg-center relative overflow-hidden w-[350px] h-[350px]`}
      >
        <div className=" rounded-lg  w-[350px] h-[350px] z-10 bg-black opacity-40 "></div>
      </div>
      <div className="text-white z-20 absolute top-0 p-4 w-[100%] h-[100%] ">
        <div className="flex justify-end">
          <p className="text-xs ">{item.name}</p>
        </div>
        <h1 className="text-2xl font-semibold overflow-hidden text-clip py-1">
          {item.title}
        </h1>
        <p className="font-light text-sm my-2">
          {startDate} ~ {endDate}
        </p>
        <div>
          {item.twentyYN == "Y" ? (
            <p className="px-3 border-r-2">#20대</p>
          ) : null}
          {item.thirtyYN == "Y" ? (
            <p className="px-3 border-r-2">#30대</p>
          ) : null}
          {item.fortyYN == "Y" ? (
            <p className="px-3 border-r-2">#40대</p>
          ) : null}
          {item.fiftyYN == "Y" ? (
            <p className="px-3 border-r-2">#50대 이상</p>
          ) : null}
        </div>
        <div className="flex">
          {item.regionsList.map((region) => {
            const regionVar = Regions.find((r) => r.key == region);
            return (
              <p key={regionVar.key} className="px-3">
                {regionVar.value}
              </p>
            );
          })}

          {item.tripStylesList.map((style) => {
            const styleVar = TripStyles.find((s) => s.key == style);
            return (
              <p key={styleVar.key} className="px-3 ">
                {styleVar.value}
              </p>
            );
          })}
        </div>
        <div className="absolute bottom-5 right-5">
          <p>
            {item.tripMateNum && item.tripMateNum != null
              ? item.tripMateNum
              : "0"}
            /{item.recruits}
          </p>
        </div>
      </div>
    </div>
  );
};
