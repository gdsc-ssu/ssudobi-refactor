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
