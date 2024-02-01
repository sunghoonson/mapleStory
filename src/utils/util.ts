// 어제 날짜를 계산하는 함수
export const getYesterdayDate = () => {
    const today = new Date();
    const adjustedDate = new Date(today);
  
    if (today.getHours() < 9) {
      adjustedDate.setDate(today.getDate() - 2);
    } else {
      adjustedDate.setDate(today.getDate() - 1);
    }
  
    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  