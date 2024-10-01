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

export function GenderSel() {
  return (
    <div className="p-[20px] ml-5">
      <h1 className="TitleLabel ml-[-10px] ">성별:</h1>
      <div className="flex w-[300px] justify-around ml-[-25px] pt-5">
        <div className="AlignItem">
          <input type="radio" name="gender" />
          <span className="SpanGap"> 여자</span>
        </div>
        <div className="AlignItem">
          <input type="radio" name="gender" />
          <span className="SpanGap"> 남자</span>
        </div>
        <div className="AlignItem">
          <input type="radio" name="gender" />
          <span className="SpanGap"> 혼성</span>
        </div>
      </div>
    </div>
  );
}
export function AgeSel() {
  return (
    <div className="p-[20px]">
      <h1 className="TitleLabel">나이대 (선택사항) :</h1>
      <div className=" flex justify-around w-[450px] ml-[-20px] pt-5">
        <div className="AlignItem ">
          <input type="checkbox" name="age" />
          <span className="SpanGap"> 20대</span>
        </div>
        <div className="AlignItem">
          <input type="checkbox" name="age" />
          <span className="SpanGap"> 30대</span>
        </div>
        <div className="AlignItem">
          <input type="checkbox" name="age" />
          <span className="SpanGap"> 40대</span>
        </div>
        <div className="AlignItem">
          <input type="checkbox" name="age" />
          <span className="SpanGap"> 50대 이상</span>
        </div>
      </div>
    </div>
  );
}

export function MateNum() {
  return (
    <div className="p-[30px] pb-20 border-b-2">
      <h1 className="TitleLabel">모집 인원 수:</h1>
      <input
        type="number"
        min="1"
        defaultValue={1}
        className="border-2 mt-5 p-1"
      />
    </div>
  );
}

export default AgeAndGender;
