import { AuthData, AuthResponse } from 'Auth';
import axios, { AxiosResponse } from 'axios';

class AuthApi {
  /** 로그인 */
  login = async (loginId: string, password: string): Promise<AuthData> => {
    const data: AxiosResponse<AuthResponse> = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        loginId,
        password,
      },
    });

    return data.data.data;
  };
}

export default AuthApi;
