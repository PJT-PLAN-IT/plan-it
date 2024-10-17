import { useNavigate } from "react-router-dom";

const RegBtnBg = () => {
  return (
    <div>
      <button className="button on big">등록하기</button>
    </div>
  );
};
const RegBtnSm = () => {
  return (
    <div>
      <button className="button on">등록하기</button>
    </div>
  );
};

const ConfirmBtnBg = () => {
  return (
    <div>
      <button className="button on big" type="submit">
        확인
      </button>
    </div>
  );
};

const ConfirmBtnSm = () => {
  return (
    <div>
      <button className="button on">확인</button>
    </div>
  );
};
const CancelBtnBg = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="button can big">취소</button>
    </div>
  );
};
const CloseBtnBg = () => {
  const stop = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <button className="button gen big" onClick={stop}>
        닫기
      </button>
    </div>
  );
};
const CloseBtnSm = () => {
  return (
    <div>
      <button className="button gen">닫기</button>
    </div>
  );
};

const MateReqBtn = () => {
  return (
    <div>
      <button className="button on big">여행 참여 신청</button>
    </div>
  );
};

const MateCnlBtn = () => {
  return (
    <div>
      <button className="button gen big">여행 참여 취소</button>
    </div>
  );
};

export {
  RegBtnBg,
  RegBtnSm,
  ConfirmBtnBg,
  ConfirmBtnSm,
  CancelBtnBg,
  CloseBtnBg,
  CloseBtnSm,
  MateReqBtn,
  MateCnlBtn,
};
