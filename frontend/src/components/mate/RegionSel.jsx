const Regions = [
  { value: "#전체", key: 0 },
  { value: "#서울", key: 1 },
  { value: "#부산", key: 6 },
  { value: "#대구", key: 4 },
  { value: "#인천", key: 2 },
  { value: "#광주", key: 5 },
  { value: "#대전", key: 3 },
  { value: "#울산", key: 7 },
  { value: "#세종", key: 8 },
  { value: "#경기", key: 31 },
  { value: "#강원", key: 32 },
  { value: "#충북", key: 33 },
  { value: "#충남", key: 34 },
  { value: "#경북", key: 35 },
  { value: "#경남", key: 36 },
  { value: "#전북", key: 37 },
  { value: "#전남", key: 38 },
  { value: "#제주", key: 39 },
];

function RegionSel({ formData, regBtnClick }) {
  return (
    <div>
      <div className="w-[900px] p-[30px] mb-[35px]">
        <h1 className="TitleLabel">지역:</h1>
        {Regions.map((region) => (
          <button
            type="button"
            key={region.key}
            onClick={() => regBtnClick(region.key)}
            className={`button ${
              formData.regButtonStates[region.key] ? "on" : ""
            }`}
          >
            {region.value}
          </button>
        ))}
      </div>
    </div>
  );
}
// export function RegionSel() {
//   return (
//     <div className="border-t-2">
//       <div className="w-[900px] p-[30px] mb-[35px]">
//         <h1 className="TitleLabel">지역:</h1>
//         <UseBtn btnstyle="button" name="#전체" value="0" />
//         <UseBtn btnstyle="button" name="#서울" value="11" />
//         <UseBtn btnstyle="button" name="#부산" value="26" />
//         <UseBtn btnstyle="button" name="#대구" value="27" />
//         <UseBtn btnstyle="button" name="#인천" value="28" />
//         <UseBtn btnstyle="button" name="#광주" value="29" />
//         <UseBtn btnstyle="button" name="#대전" value="30" />
//         <UseBtn btnstyle="button" name="#울산" value="31" />
//         <UseBtn btnstyle="button" name="#세종" value="36" />
//         <UseBtn btnstyle="button" name="#경기" value="41" />
//         <UseBtn btnstyle="button" name="#강원" value="51" />
//         <UseBtn btnstyle="button" name="#충북" value="43" />
//         <UseBtn btnstyle="button" name="#충남" value="44" />
//         <UseBtn btnstyle="button" name="#경북" value="47" />
//         <UseBtn btnstyle="button" name="#경남" value="48" />
//         <UseBtn btnstyle="button" name="#전북" value="52" />
//         <UseBtn btnstyle="button" name="#전남" value="46" />
//         <UseBtn btnstyle="button" name="#제주" value="50" />
//       </div>
//     </div>
//   );
// }

export default RegionSel;
