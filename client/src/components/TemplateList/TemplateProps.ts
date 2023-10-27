import { PatronInfo } from '@/@types/ReservationList';

export interface TemplateProps {
  // template 제목
  title: string;
  // template 시작 시간, 끝나는 시간
  beginTime: string;
  endTime: string;
  // template 장소
  place: string;
  // template 메모
  memo: string;
  // template 동반이용자
  friends: PatronInfo[];
  type?: 'RESERVE' | 'TEMPLATE';
}
