import AuthApi from '@/apis/auth';
import { authInfoState } from '@/atoms/authInfoState';
import {
  getUserInfo,
  removeUserInfo,
  updateUserInfo,
} from '@/utils/lib/infoHandler';
import {
  getAccessToken,
  removeAccessToken,
  updateAccessToken,
} from '@/utils/lib/tokenHandler';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useToast } from '.';

const useAuth = () => {
  const authApi = new AuthApi();
  const { showToast } = useToast();

  const router = useRouter();
  const [authInfo, setAuthInfo] = useAtom(authInfoState);
  const [isWarn, setIsWarn] = useState(false);
  const [token, setToken] = useState<string | undefined>('');

  /**
   * 로그인 함수
   */
  const handleLogin = async (id: string, password: string) => {
    try {
      const data = await authApi.login(id, password);
      console.log(data);
      setAuthInfo({
        name: data.name,
        sId: data.printMemberNo,
      });
      updateAccessToken(data.accessToken);
      updateUserInfo(data.name, data.printMemberNo, id, password);
      setIsWarn(false);
      showToast('positive', '로그인에 성공하였습니다.');
      router.replace('/');
    } catch (err) {
      setIsWarn(true);
      showToast('negative', '로그인에 실패하였습니다.\n다시 시도해주세요!');
      console.log(err);
    }
  };

  /**
   * 자동 로그인 함수
   */
  const autoLogin = async () => {
    try {
      const userInfo = getUserInfo();
      if (!userInfo) throw new Error('Empty user info');
      const data = await authApi.login(userInfo.loginId, userInfo.password);

      setAuthInfo({
        name: data.name,
        sId: data.printMemberNo,
      });
      updateAccessToken(data.accessToken);
      updateUserInfo(
        data.name,
        data.printMemberNo,
        userInfo.loginId,
        userInfo.password,
      );
    } catch (err) {
      console.log(err);
      router.replace('/landing');
    }
  };

  /**
   * 로그인 함수
   */
  const handleLogout = async () => {
    try {
      setAuthInfo({ name: '', sId: '' });
      removeAccessToken();
      removeUserInfo();
      showToast('positive', '로그아웃에 성공하였습니다.');
      router.replace('/landing');
    } catch (err) {
      showToast('negative', '로그아웃에 실패하였습니다.\n다시 시도해주세요!');
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) setToken(getAccessToken());
  }, []);

  return { authInfo, autoLogin, handleLogin, isWarn, handleLogout, token };
};

export default useAuth;
