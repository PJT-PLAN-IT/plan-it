const TripStyles = [
  { value: "#자유여행", key: 10 },
  { value: "#관광체험", key: 721 },
  { value: "#문화탐험", key: 13 },
  { value: "#축제경험", key: 321 },
  { value: "#레포츠모험", key: 12 },
  { value: "#맛집탐방", key: 131 },
];
function TripStyle({ formData, trpBtnClick }) {
  return (
    <div className="border-t-2 pt-5">
      <div className="py-[10px] px-[30px] my-[9px]">
        <h1 className="TitleLabel">여행 스타일:</h1>
        {TripStyles.map((trips) => (
          <button
            type="button"
            key={trips.key}
            onClick={() => trpBtnClick(trips.key)}
            className={`button ${
              formData.tripButtonStates[trips.key] ? "on" : ""
            }`}
          >
            {trips.value}
          </button>
        ))}
      </div>
    </div>
  );
}
// export function TripStyle() {
//   return (
//     <div className="border-t-2">
//       <div className="py-[10px] px-[30px] my-[9px]">
//         <h1 className="TitleLabel">여행 스타일:</h1>
//         <UseBtn btnstyle="button" value="1" name="#자유여행" />
//         <UseBtn btnstyle="button" value="2" name="#관광지" />
//         <UseBtn btnstyle="button" value="3" name="#문화시설" />
//         <UseBtn btnstyle="button" value="4" name="#축제" />
//         <UseBtn btnstyle="button" value="5" name="#레포츠" />
//         <UseBtn btnstyle="button" value="6" name="#맛집탐방" />
//       </div>
//     </div>
//   );
// }

export default TripStyle;
