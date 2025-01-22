import AxiosInstance from './AxiosInstance.tsx';

interface loginData {
  username: string;
  password: string;
}

// 회원가입
export const register = async ( loginData:loginData ) => {
  try {
    const response = await AxiosInstance.post('/auth/register', loginData);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// 로그인
export const login = async ( loginData:loginData ) => {
  try {
    const response = await AxiosInstance.post('/auth/login', loginData);
    const { token } = response.data;
    localStorage.setItem('jwtToken', token); // 토큰 저장
    return response.data;
  } catch (error) {
    throw error.response;
  }
};