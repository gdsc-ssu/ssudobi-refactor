import AuthApi from '@/apis/auth';
import { authInfoState } from '@/atoms/authInfoState';
import { getUserInfo, updateUserInfo } from '@/utils/lib/infoHandler';
import { updateAccessToken } from '@/utils/lib/tokenHandler';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

const useAuth = () => {
  const authApi = new AuthApi();

  const router = useRouter();
  const [authInfo, setAuthInfo] = useAtom(authInfoState);

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
      router.replace('/');
    } catch (err) {
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
      console.log(data);
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

  return { authInfo, autoLogin, handleLogin };
};

export default useAuth;
