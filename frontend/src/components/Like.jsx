import { AiFillHeart } from "react-icons/ai";

function Like() {
    return (
        <>
            <div>여행 메이트 : {name}</div>
            <div className="flex items-center">
                <button className="relative right-4 bottom-4">
                        <AiFillHeart className="text-red-500 w-6 h-6"/>
                        {/*<AiOutlineHeart className="text-gray-500 w-6 h-6"/>*/}
                </button>
            </div>
        </>
    );

}

export default Like;