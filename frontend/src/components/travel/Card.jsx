function Card({travelList}) {
    return (
        <div className="grid grid-cols-3 gap-6">
            {travelList.map((item, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
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