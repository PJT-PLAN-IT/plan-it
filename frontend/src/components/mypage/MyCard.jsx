import {useNavigate} from "react-router-dom";

function MyCard({item, component}) {
    const navigate = useNavigate();

    const goPage = () => {
        navigate(`/planit/mates/details?findMateNo=${item.findMateNo}`)
    }

    return (

        <div className="bg-white rounded-lg shadow-md cursor-pointer" onClick={goPage}>
            <img src={item.thumbnailImg} alt="이미지" className="w-full h-40 object-cover"/>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-500">{item.startDt.substring(0,10)} ~ {item.endDt.substring(0,10)}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-500">{item.content}</p>
                </div>

                <div className="flex justify-between items-center">
                    {component}
                </div>
            </div>
        </div>
    );
}

export default MyCard;

