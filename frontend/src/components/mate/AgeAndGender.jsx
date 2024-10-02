export function AgeAndGender() {
  return (
    <div className="flex-col my-[30px]">
      <div className="flex">
        <GenderSel />
        <AgeSel />
      </div>
      <MateNum />
    </div>
  );
}

export function GenderSel({ formData, handleGenderChange }) {
  const genderInfo = [
    {
      name: "여자",
      key: "f",
    },
    {
      name: "남자",
      key: "m",
    },
    {
      name: "혼성",
      key: "fm",
    },
  ];
  return (
    <div className="p-[20px] ml-5">
      <h1 className="TitleLabel ml-[-10px] ">성별:</h1>
      <div className="flex w-[300px] justify-around ml-[-25px] pt-5">
        {genderInfo.map((gender) => (
          <div className="AlignItem">
            <input
              type="radio"
              name="gender"
              value={gender.key}
              checked={formData.genderState === gender.key}
              onChange={handleGenderChange}
            />
            <span className="SpanGap"> {gender.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AgeSel({ ageButtonChange }) {
  const ageGroup = [
    { demo: " 20대", key: 20, name: "twenty" },
    { demo: " 30대", key: 30, name: "thirty" },
    { demo: " 40대", key: 40, name: "forty" },
    { demo: "50대 이상", key: 50, name: "fifty" },
  ];
  return (
    <div className="p-[20px]">
      <h1 className="TitleLabel">나이대 (선택사항) :</h1>
      <div className=" flex justify-around w-[450px] ml-[-20px] pt-5">
        {ageGroup.map((age) => (
          <div className="AlignItem ">
            <input
              type="checkbox"
              name="age"
              key={age.key}
              onClick={() => ageButtonChange(age.name)}
            />
            <span className="SpanGap"> {age.demo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MateNum({ mateNumChange }) {
  return (
    <div className="p-[30px] pb-20 border-b-2">
      <h1 className="TitleLabel">모집 인원 수:</h1>
      <input
        type="number"
        min="1"
        defaultValue={1}
        className="border-2 mt-5 p-1"
        onChange={mateNumChange}
      />
    </div>
  );
}

export default AgeAndGender;
