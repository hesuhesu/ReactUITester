const AUTH = process.env.REACT_APP_AUTH;

export const authCheck = () => {
    if (localStorage.length === 0){ // LocalStorage 가 깨끗하면 종료
        return 0;
    }
    if (localStorage.getItem(localStorage.key(0)) !== AUTH) { // // LocalStorage 임의 삽입 방지
      return 0;
    }
    return 1;
}