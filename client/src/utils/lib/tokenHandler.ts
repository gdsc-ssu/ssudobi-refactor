/**
 * 액세스 토큰 가져오기
 */
export const getAccessToken = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};

/**
 * 액세스 토큰 업데이트
 */
export const updateAccessToken = (token: string) => {
  localStorage.setItem('ACCESS_TOKEN', token);
};

/**
 * 토큰 삭제 (로그아웃)
 */
export const removeAccessToken = () => {
  localStorage.removeItem('ACESS_TOKEN');
};
