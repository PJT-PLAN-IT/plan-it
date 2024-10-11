

//여행 스타일
function TripCategory({category, onChangeCategory}) {
    const TripStyles = [
        { value: "#전체", key: '' },
        { value: "#관광지", key: 12 },
        { value: "#문화시설", key: 14 },
        { value: "#축제공연행사", key: 15 },
        { value: "#여행코스", key: 25 },
        { value: "#레포츠", key: 28 },
        { value: "#숙박", key: 32 },
        { value: "#쇼핑", key: 38 },
        { value: "#음식점", key: 39 }
    ];

    const tripBtnClick = (key) => {
        onChangeCategory(key);
    };

    return (
        <div className="border-t-2">
            <div className="py-[10px] px-[30px] my-[9px]">
                <h1 className="TitleLabel">여행 스타일:</h1>
                {TripStyles.map((trips) => (
                    <button
                        type="button"
                        key={trips.key}
                        onClick={() => tripBtnClick(trips.key)}
                        className={`button ${
                            trips.key === category ? "on" : ""
                        }`}
                    >
                        {trips.value}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TripCategory;