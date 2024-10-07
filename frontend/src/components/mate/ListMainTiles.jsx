import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function ListMainTiles() {
  return (
    <div className="flex flex-wrap gap-10 my-20 justify-center">
      <ListMainTile />
      <ListMainTile />
      <ListMainTile />
      <ListMainTile />
      <ListMainTile />
      <ListMainTile />
      <ListMainTile />
      <ListMainTile />
      <ListMainTile />
    </div>
  );
}

const ListMainTile = () => {
  const heart = (
    <FontAwesomeIcon
      className="text-gray-200 font-medium text-[30px]"
      icon={faHeart}
    />
  );
  return (
    <div className="rounded-lg border-2 w-[400px] h-[400px] overflow-hidden bg-[url('./assets/img/img6.jpg')] bg-cover bg-center relative">
      <div className="w-[100%] h-[100%] rounded-lg  z-10  bg-black opacity-50"></div>
      <div className="text-white z-20 absolute top-0 p-4 w-[100%] h-[100%]">
        <div className="flex justify-between">
          <p className="text-lg">윤윤</p>
          <p>{heart}</p>
        </div>
        <h1 className="text-2xl my-4 font-semibold">에버랜드갈 20대 친구들~</h1>
        <p className="font-light my-2">2024.10.29~2024.10.30</p>
        <div className="flex gap-2 ">
          <span>#자유여행</span>
          <span>#20대</span>
          <span>#혼성</span>
        </div>
        <div>
          <button className="my-5 border-orange bg-white text-orange mr-10 border-2 p-1 px-2 rounded-lg relative">
            경기도
            <span className=" z-30 bg-orange text-white rounded-full px-1 text-[10px] absolute -top-1 ">
              2
            </span>
          </button>
        </div>
        <p className="absolute bottom-5 right-5 text-lg color font-semibold">
          2/4
        </p>
      </div>
    </div>
  );
};

export default ListMainTiles;

export { ListMainTile };
