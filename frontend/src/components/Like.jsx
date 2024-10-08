import { AiFillHeart } from "react-icons/ai";
import {useAxiosInstance} from "../utils/axiosConfig.js";

function Like({item, refreshData}) {
    const axiosInstance = useAxiosInstance();

    const unLikeClick = async () => {
        try{
            const response = await axiosInstance.post("/api/my/mates/like/revoke", {findMateLikeNo : item.findMateLikeNo});
            if (response.data.code === 200) {
                console.log("좋아요 취소 성공");
                refreshData("2024"); // 데이터 새로고침
            }
            else {
                console.error("좋아요 취소 실패", response.data.message);
            }
        }
        catch (error){
            console.error("서버 오류", error);
        }

    };

    return (
        <>
            <div>여행 메이트 : {item.name}</div>
            <div className="flex items-center">
                <button
                    onClick={unLikeClick}
                    className="relative right-4 bottom-4">
                        <AiFillHeart className="text-red-500 w-6 h-6"/>
                </button>
            </div>
        </>
    );

}

export default Like;