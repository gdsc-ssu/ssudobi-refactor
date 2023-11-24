import { getAccessToken } from '@/utils/lib/tokenHandler';
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
  reservation = async (
    room: string,
    roomUseSection: number,
    beginTime: string,
    endTime: string,
    patronIds: string[],
  ) => {
    const requestBody = {
      room: room /*세미나실 번호*/,
      roomUseSection:
        roomUseSection /*세미나실 사용 용도 1: 학습, 2:회의, 3:수업, 4:기타*/,
      beginTime: beginTime, //'YYYY-MM-DD HH:MM'
      endTime: endTime,
      patronCount: patronIds.length /*동반 사용자 수 */,
      alternativeIds: patronIds /*동반 사용자의 도서관 id 리스트*/,
    };

    const accessToken = getAccessToken();

    const headers = {
      Accept: 'application/json, text/plain, */*',
      'pyxis-auth-token': `${accessToken}`,
    };
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}pc/rooms/${room}/reserve`;
    const response = await axios.post(apiUrl, requestBody, { headers });
    const { data } = response;
    return data;
  };
}

export default AuthApi;
