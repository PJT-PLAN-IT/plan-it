import {useState} from "react";

const SelectContentTypeId = ({onSendData}) => {


    const contentTypeIdList = [
        {key : "관광지", value : "12"}
        ,{key : "문화시설", value : "14"}
        ,{key : "행사/공연/축제", value : "15"}
        ,{key : "레포츠", value : "28"}
        ,{key : "숙박", value : "32"}
        ,{key : "쇼핑", value : "38"}
        ,{key : "음식점", value : "39"}
    ];

    const saveContentTypeId = (e) => {
        setIsSelected(e);
        onSendData(e);
    };

    const [isSelected, setIsSelected] = useState(0);

    return (
        <div className={`my-5 flex flex-wrap items-center justify-center`}>
            {contentTypeIdList.map((content) => (
                <div className={`mx-2 my-1 py-1 px-2 font-light text-sm  rounded-lg cursor-pointer ${ content.value === isSelected  ? 'bg-orange' : `bg-gray-200`}`}
                     key={content.key} value={content.value}
                     onClick={() => saveContentTypeId(content.value)}>
                    {content.key}
                </div>
            ))}
        </div>
    )
}

export default SelectContentTypeId;