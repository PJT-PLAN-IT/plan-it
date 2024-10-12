import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param totalCount 전체 갯수
 * @param page 페이지 수
 * @param handlePageChange 페이지 처리 부모 메소드
 * @param itemsPerPage 한 페이지에 표시할 여행 정보 수
 * @param maxPageButton 한 번에 표시할 페이지 번호 버튼 수
 * @returns {JSX.Element}
 * @constructor
 */
function Page({totalCount, page, handlePageChange, itemsPerPage = 10, maxPageButtons = 5}) {
    const left = <FontAwesomeIcon icon={faArrowLeft} />;
    const right = <FontAwesomeIcon icon={faArrowRight} />;

    // 페이지 번호 구간 계산
    const totalPages = Math.ceil(totalCount / itemsPerPage); // 전체 페이지 수 계산
    const startPage = Math.floor(page / maxPageButtons) * maxPageButtons; // 현재 페이지 그룹의 시작 페이지
    const endPage = Math.min(startPage + maxPageButtons, totalPages); // 현재 페이지 그룹의 마지막 페이지

    const onChangePageHandler = (page) => {
        handlePageChange(page);
    };

    return(
        <div className="flex justify-center mt-10">
            <div className="flex items-center justify-center my-20">
                <div className="flex justify-evenly w-[30%] ">
                    <button onClick={() => onChangePageHandler(page - 1)} disabled={page === 0}>
                        {left}
                    </button>
                    <div className="flex gap-10 ">
                        {Array.from({ length: endPage - startPage }, (_, i) => startPage + i).map((pageIndex) => (
                            <button
                                key={pageIndex}
                                onClick={() => onChangePageHandler(pageIndex)}
                                className={`p-2 px-4 rounded-lg ${pageIndex === page ? 'bg-orange-500 text-white' : ''}`}
                            >
                                {pageIndex + 1}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => onChangePageHandler(page + 1)} disabled={page + 1 >= totalPages}>
                        {right}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;