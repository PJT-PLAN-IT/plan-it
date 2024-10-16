import "../../App.css";
import "../../assets/css/Write.css";
import Banner from "../../components/mate/Banner";
import { PostCard2 } from "../MainPage";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MateList() {
  const { token } = useAuth();
  const [mates, setMates] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(16);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

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

  return (
    <div className="mx-[300px]">
      <Banner />

      <section className="section h-[40vh] py-[30px] ">
        <div className="flex justify-between mb-5">
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
        <div className=" grid-container grid grid-cols-4 gap-4 py-10  ">
          {mates.map((mate) => (
            <PostCard2
              key={mate.findMateNo}
              item={mate}
              onClickMate={onClickMate}
            />
          ))}
        </div>

        <div className=" py-10 flex justify-evenly items-center text-orange font-semibold ">
          <button onClick={handlePreviousPage} disabled={page === 0}>
            prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages - 1}>
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
