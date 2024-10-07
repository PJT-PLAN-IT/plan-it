import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Pagination() {
  const left = <FontAwesomeIcon icon={faArrowLeft} />;
  const right = <FontAwesomeIcon icon={faArrowRight} />;
  return (
    <div className="flex items-center justify-center my-20">
      <div className="flex justify-evenly w-[30%] ">
        <button>{left}</button>
        <div className="flex gap-10 ">
          <button className="on p-2 px-4 rounded-lg ">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
        <button>{right}</button>
      </div>
    </div>
  );
}

export default Pagination;
