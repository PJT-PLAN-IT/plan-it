export function AddComment() {
  return (
    <div className="border-2 py-2 my-20 flex-col ">
      <div className="w-[100%] h-[100px] mb-5">
        <p className="pl-2 pb-2 border-b  text-lg font-semibold">윤님</p>
        <textarea
          className="w-[100%] h-[100%] p-2 "
          placeholder="댓글을 입력하세요"
        ></textarea>
      </div>
      <button className="border-2 button gen my-2">등록</button>
    </div>
  );
}

export function ShowComment() {
  return (
    <div className="my-20">
      <h1 className="border-b-2 p-2">
        댓글 <b>2</b>
      </h1>
      <div>
        <div className="p-2 py-[40px] border-b-2">
          <div className="relative ">
            <p className="font-semibold pt-1">윤님</p>
            <div className="flex justify-around w-[5%] absolute top-4 right-6 text-xs underline">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
          <h3 className="py-5">참여 신청 넣었어요, 확인 부탁드립니다~</h3>
          <div>
            <div className="flex justify-between w-[15%]">
              <span className="font-light">2024.09.24 20:42</span>
              <span className="underline font-medium">답글</span>
            </div>
          </div>
        </div>
        <div className="pl-10 py-[40px]">
          <div className="relative ">
            <p className="font-semibold pt-1">윤님</p>
            <div className="flex justify-around w-[5%] absolute top-4 right-6 text-xs underline">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>
          <h3 className="py-5">참여 신청 넣었어요, 확인 부탁드립니다~</h3>
          <div>
            <div className="flex justify-between w-[15%]">
              <span className="font-light">2024.09.24 20:42</span>
              <span className="underline font-medium">답글</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
