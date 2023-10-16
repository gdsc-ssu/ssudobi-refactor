export type StudentInfo = {
  name: string;
  sId: string;
  loginId: string;
  password: string;
};

/**
 * 정보 가져오기
 */
export const getUserInfo = (): StudentInfo | null => {
  const data = localStorage.getItem('USER_INFO');
  return data ? JSON.parse(data) : null;
};

/**
 * 정보 업데이트
 */
export const updateUserInfo = (
  name: string,
  sId: string,
  loginId: string,
  password: string,
) => {
  const data = {
    name,
    sId,
    loginId,
    password,
  };
  localStorage.setItem('USER_INFO', JSON.stringify(data));
};

/**
 * 정보 삭제 (로그아웃)
 */
export const removeUserInfo = () => {
  localStorage.removeItem('USER_INFO');
};
