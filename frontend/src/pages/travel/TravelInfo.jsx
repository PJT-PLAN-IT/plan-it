
import RegionSel from "../../components/mate/RegionSel.jsx";

import {useEffect, useState} from "react";
import {useAxiosInstance} from "../../utils/axiosConfig.js";

import SearchBox from "../../components/travel/SearchBox.jsx";
import Page from "../../components/travel/Page.jsx";
import Card from "../../components/travel/Card.jsx";
import TripCategory from "../../components/travel/TripCategory.jsx";


const Regions = [
    { value: "#전체", key: 0 },
    { value: "#서울", key: 1 },
    { value: "#부산", key: 6 },
    { value: "#대구", key: 4 },
    { value: "#인천", key: 2 },
    { value: "#광주", key: 5 },
    { value: "#대전", key: 3 },
    { value: "#울산", key: 7 },
    { value: "#세종", key: 8 },
    { value: "#경기", key: 31 },
    { value: "#강원", key: 32 },
    { value: "#충북", key: 33 },
    { value: "#충남", key: 34 },
    { value: "#경북", key: 35 },
    { value: "#경남", key: 36 },
    { value: "#전북", key: 37 },
    { value: "#전남", key: 38 },
    { value: "#제주", key: 39 },
];

const Region = ({ formData, regBtnClick }) => {
    return (
        <div className="border-t-2">
            <div className="py-[10px] px-[30px] my-[9px]">
                <h1 className="TitleLabel">지역:</h1>
                {Regions.map((region) => (
                    <button
                        type="button"
                        key={region.key}
                        onClick={() => regBtnClick(region.key)}
                        className={`button ${
                            formData.regButtonStates[region.key] ? "on" : ""
                        }`}
                    >
                        {region.value}
                    </button>
                ))}
            </div>
        </div>
    );
};

export {Region};

function TravelInfo() {
  const initData = {
    regButtonStates: {
      0: true,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      31: false,
      32: false,
      33: false,
      34: false,
      35: false,
      36: false,
      37: false,
      38: false,
      39: false,
    },
  };
  const axiosInstance = useAxiosInstance();

  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [isSearchBtnClick, setIsSearchBtnClick] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState(initData);
  const [travelList, setTravelList] = useState([]);
  const [skipFetch, setSkipFetch] = useState(false); // 추가된 상태 변수

  //지역클릭
  const regBtnClick = (btnState) => {
    setFormData((prev) => {
      const isCurrentlyActive = prev.regButtonStates[btnState]; // 현재 클릭한 버튼이 활성화 상태인지 확인

      const updatedRegButtonStates = Object.keys(prev.regButtonStates).reduce(
        (newStates, key) => {
          // 클릭한 버튼이 이미 활성화된 상태라면 전체(0)만 true로 설정
          if (isCurrentlyActive || btnState === 0) {
            newStates[key] = key === "0"; // 전체 버튼만 활성화
          }
          // 클릭한 버튼이 비활성화된 상태라면 그 버튼을 활성화하고 전체를 비활성화
          else {
            newStates[key] = parseInt(key) === btnState;
            if (key === "0") {
              newStates[0] = false; // 다른 버튼이 활성화되면 전체 버튼은 비활성화
            }
          }
          return newStates;
        },
        {}
      );

      return {
        ...prev,
        regButtonStates: updatedRegButtonStates,
      };
    });
    btnClickSetState();
  };

  //카테고리 변경
  const handleCategory = (category) => {
    setCategory(category);
    btnClickSetState();
  };

  //버튼클릭시 상태 초기화
  const btnClickSetState = () => {
    setPage(0);
    setIsSearchBtnClick(false);
    setSkipFetch(false);
  };

<<<<<<< HEAD
  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(totalCount / 12)) {
      setPage(newPage); // 페이지 상태 업데이트
    }
  };

  //검색
  const searchBtnClick = () => {
    setPage(0);
    setFormData(initData);
    setCategory("");
    setSkipFetch(true); // 페이지 초기화 시 API 호출 생략
    setIsSearchBtnClick(true);
  };

  //여행정보 데이터 가져오기
  const fetchDataList = async () => {
    const trueKeys = Object.entries(formData.regButtonStates)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    const response = await axiosInstance.get("/api/place/region/type", {
      params: {
        pageNo: page + 1,
        contentTypeId: category,
        areaCode: trueKeys[0] === "0" ? "" : trueKeys[0],
      },
    });
    apiCallback(response);
  };

  //검색어 입력 클릭
  const fetchKeywordDataList = async () => {
    try {
      const response = await axiosInstance.get("/api/place/keyword", {
        params: {
          pageNo: page + 1,
          keyword: searchInput,
        },
      });
      apiCallback(response);
    } catch (error) {
      console.log(error);
    }
  };

  //api 응답처리
  const apiCallback = (response) => {
    if (response.data.code === 200 && response.data.data.totalCount > 0) {
      setTravelList(response.data.data.list || []);
      setTotalCount(response.data.data.totalCount || 0);
    }
  };

  // 페이지, 카테고리, 지역 필터가 변경될 때 데이터 가져오기
  useEffect(() => {
    if (!skipFetch) {
      fetchDataList();
      setSkipFetch(false); // 이후에는 API 호출을 허용
    }
    if (isSearchBtnClick) {
      fetchKeywordDataList();
      setSkipFetch(true); // 이후에는 API 호출을 허용
    }
  }, [formData.regButtonStates, category, page]);

  return (
    <div className="App mx-[300px]">
      {/* 카테고리 탭 */}
      <div className="text-center mb-20 mt-10">
          <h2 className="text-3xl font-bold mb-4">여행정보</h2>
          <RegionSel formData={formData} regBtnClick={regBtnClick}></RegionSel>
        <TripCategory
            category={category}
            onChangeCategory={handleCategory}
        ></TripCategory>
      </div>
      {/*검색어*/}
      <SearchBox
        searchValue={searchInput}
        setSearchValue={setSearchInput}
        onSearchClick={searchBtnClick}
      ></SearchBox>
      {/* 여행정보 카드 리스트 */}
      <Card travelList={travelList}></Card>
      <Page
        page={page}
        totalCount={totalCount}
        itemsPerPage={12}
        handlePageChange={handlePageChange}
      ></Page>
    </div>
  );
=======
    return (
        <div className="App mx-[300px]">
            {/* 카테고리 탭 */}
            <div className="text-center mb-6 mt-10">
                <h2 className="text-3xl font-bold mb-4">여행정보</h2>
                <Region formData={formData} regBtnClick={regBtnClick}></Region>
                <TripCategory category={category} onChangeCategory={handleCategory}></TripCategory>
            </div>
            {/*검색어*/}
            <SearchBox searchValue={searchInput} setSearchValue={setSearchInput} onSearchClick={searchBtnClick}></SearchBox>
            {/* 여행정보 카드 리스트 */}
            <Card travelList={travelList}></Card>
            <Page page={page} totalCount={totalCount} itemsPerPage={12} handlePageChange={handlePageChange} ></Page>
        </div>
    );
>>>>>>> main
}

export default TravelInfo;
