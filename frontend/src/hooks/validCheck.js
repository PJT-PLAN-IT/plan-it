function btnVal(arr, txt) {
  const arrL = arr.length;
  let totalCountF = 0;
  if (arrL > 1) {
    for (let i = 0; i < arrL; i++) {
      const v = arr[i];
      if (v === false) {
        totalCountF++;
      } else if (v === "") {
        alert(`${txt}를 선택해주세요 `);
        return false;
      } else {
        return true;
      }
    }
    if (totalCountF === arrL) {
      alert(`하나 이상의 ${txt}을 선택해주세요 `);
      return false;
    } else {
      return true;
    }
  } else if (arr === "") {
    alert(`${txt}: 필수 항목입니다. 기재해주세요.  `);
    return false;
  } else {
    return true;
  }
}

export { btnVal };
