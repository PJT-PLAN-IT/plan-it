import {useNavigate} from "react-router-dom";

function MateButton({custNo, value}) {
    const navigate = useNavigate();
    const goPage = (e) => {

        e.preventDefault();
        let buttonValue = e.target.value;
        if(buttonValue === "registerMate"){//작성한 메이트글
            navigate(`/mypage/mate/${custNo}`);
        }
        else if(buttonValue === "applyMate"){
            navigate(`/mypage/applyMate/${custNo}`)
        }
        else if(buttonValue === "likeMate"){
            navigate(`/mypage/likeMate/${custNo}`)
        }
        else{
            //TODO 작성하기 페이지로 이동
        }
    };

    return (
        <>
            <button value="registerMate" onClick={goPage} className={`font-bold ${value === "registerMate"  ? 'text-orange-500' : 'text-gray-500'}`}>작성한 메이트글</button>
            <button value="applyMate"    onClick={goPage} className={`font-bold ${value === "applyMate"     ? 'text-orange-500' : 'text-gray-500'}`}>신청한 메이트글</button>
            <button value="likeMate"     onClick={goPage} className={`font-bold ${value === "likeMate"      ? 'text-orange-500' : 'text-gray-500'}`}>좋아요 한 메이트 글</button>
        </>
    )
    ;
}

export default MateButton;