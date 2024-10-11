import {useState} from "react";

function SelectContentTypeId(){


    const contentTypeIdList = [
        {key : "관광지", value : "12"}
        ,{key : "문화시설", value : "14"}
        ,{key : "행사/공연/축제", value : "15"}
        ,{key : "여행코스", value : "25"}
        ,{key : "레포츠", value : "28"}
        ,{key : "숙박", value : "32"}
        ,{key : "쇼핑", value : "38"}
        ,{key : "음식점", value : "39"}
    ];
    const saveContentTypeId = (e) => {
        setIsSelectContentType(e);
        //  이 턴에 saveContentTypeId를 가지고 오면 값 못가지고옴
    };
    const [isSelectContentType, setIsSelectContentType] = useState('');

    return (
        <div className={`my-5 flex flex-wrap items-center justify-center`}>
            {contentTypeIdList.map((content) => (
                <div key={content.key} value={isSelectContentType}
                     className={`mx-2 my-1 py-1 px-2 font-light text-sm bg-gray-200 rounded-lg`}
                     onClick={() => saveContentTypeId(content.value)}>
                    {content.key}
                </div>
            ))}
        </div>
    )
}

export default SelectContentTypeId;