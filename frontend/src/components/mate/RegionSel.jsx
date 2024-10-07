const Regions = [
  { value: "#전체", key: 0 },
  { value: "#서울", key: 11 },
  { value: "#부산", key: 26 },
  { value: "#대구", key: 27 },
  { value: "#인천", key: 28 },
  { value: "#광주", key: 29 },
  { value: "#대전", key: 30 },
  { value: "#울산", key: 31 },
  { value: "#세종", key: 36 },
  { value: "#경기", key: 41 },
  { value: "#강원", key: 51 },
  { value: "#충북", key: 43 },
  { value: "#충남", key: 44 },
  { value: "#경북", key: 47 },
  { value: "#경남", key: 48 },
  { value: "#전북", key: 52 },
  { value: "#전남", key: 46 },
  { value: "#제주", key: 50 },
];

function RegionSel({ formData, regBtnClick }) {
  return (
    <div className="border-t-2">
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
