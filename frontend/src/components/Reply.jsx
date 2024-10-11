import {useEffect, useState} from "react";
import {useAxiosInstance} from "../utils/axiosConfig.js";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

function Reply() {
    const left = <FontAwesomeIcon icon={faArrowLeft} />;
    const right = <FontAwesomeIcon icon={faArrowRight} />;
    const {custNo} = useParams();
    const axiosInstance = useAxiosInstance();
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchComments();
    }, [page]);

    //댓글 불러오기
    const fetchComments = async () => {
        const response = await axiosInstance.get(`/api/my-page/replys/${custNo}?page=${page}`);
        if(response.data.code === 200){
            setComments(response.data.data);
            if(response.data.data.length > 0){
                setTotalCount(response.data.data[0].totalCount);
            }
        }
        else{
            setComments([]);
        }
    };

    //삭제
    const deleteOnClick = async (no) => {
        try{
            const response = await axiosInstance.delete("/api/my-page/replys/delete", {data : {findMateReplyNo : no}});
            if(response.data.code === 200){
                fetchComments();
            }
            else{
                alert("삭제 실패");
            }
        }
        catch (error){
            console.log("서버오류 : " + error);
        }
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < Math.ceil(totalCount / 10)) {
            setPage(newPage); // 페이지 상태 업데이트
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg">
                <table className="min-w-full table-auto">
                    <tbody>
                    {comments.map((comment) => (
                        <tr key={comment.findMateReplyNo} className="border-t border-b">
                            <td className="px-6 py-4 border-l-0 border-r-0">
                                <input type="checkbox"/>
                            </td>
                            <td className="px-6 py-4 text-gray-700 border-l-0 border-r-0">
                                <p className="text-gray-700 font-bold">{comment.title}</p> {/* 제목에 강조 스타일 추가 */}
                                <p className="text-gray-700">{comment.reply}</p> {/* 댓글도 같은 색상 적용 */}
                            </td>
                            <td className="px-6 py-4 text-right text-gray-500 border-l-0 border-r-0">
                                {comment.createDt}
                            </td>
                            <td className="px-6 py-4 text-right border-l-0 border-r-0">
                                <button
                                    onClick={() => deleteOnClick(comment.findMateReplyNo)}
                                    className="bg-orange-500 text-white px-4 py-1 rounded-full">삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/*나중에 페이지네이션 완료되면 붙이기 */}
            {totalCount > 0 && (
                <div className="flex justify-center mt-10">
                    <div className="flex items-center justify-center my-20">
                        <div className="flex justify-evenly w-[30%] ">
                            <button onClick={() => handlePageChange(page -1)}>{left}</button>
                            <div className="flex gap-10 ">
                                {[...Array(Math.ceil(totalCount / 10)).keys()].map((pageIndex) => (
                                    <button
                                        key={pageIndex}
                                        onClick={() => handlePageChange(pageIndex)}
                                        className={`p-2 px-4 rounded-lg ${pageIndex === page ? 'bg-orange-500 text-white' : ''}`}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => handlePageChange(page + 1)}>{right}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Reply;