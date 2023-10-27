/**
 * 액세스 토큰 가져오기
 */
export const getAccessToken = () => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  return token || undefined;
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
