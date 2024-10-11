import {useNavigate} from "react-router-dom";

function Card({travelList}) {
    const navigate = useNavigate();

    //상세페이지로 이동
    const onClickCard = (contentId, contentTypeId) => {
        console.log(contentId, contentTypeId);
        navigate("/travel/detail", {state: { contentId: contentId, contentTypeId: contentTypeId} });
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            {travelList.map((item, index) => (
                <div key={index}
                     onClick={() => onClickCard(item.contentid, item.contenttypeid)}
                     className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                    <img src={item.firstimage2} alt={item.title} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-gray-700 font-semibold">{item.title}</h3>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default Card;