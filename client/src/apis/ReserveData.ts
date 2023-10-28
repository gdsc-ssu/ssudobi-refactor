import { ReservationData } from '@/@types/ReservationList';
import axios from 'axios';

export const getReservationData = async (AccessToken?: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_RESERVATION_CHECK}`;
  const headers = {
    Accept: 'application/json, text/plain, */*',
    'pyxis-auth-token': `${AccessToken}`, //로그인 후 발급받은 토큰
  };

  const res = await axios.get<ReservationData>(apiUrl, { headers });

  return res.data;
};

export const postReservationCancel = async (
  reserveId?: number,
  AccessToken?: string,
) => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_RESERVATION_CHECK}/${reserveId}/cancel?_method=delete`;
    const headers = {
      Accept: 'application/json;charset=UTF-8',
      'pyxis-auth-token': `${AccessToken}`, //로그인 후 발급받은 토큰
    };

    // API 호출
    await axios
      .post(apiUrl, null, { headers })
      .then((res) => {
        console.log('res', res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  } catch (error) {
    console.error('로그인 오류: ', error);
  } finally {
  }
};
