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

  // 보여지는 페이지가 예약페이지인지 템플릿 페이지 인지
  type?: 'RESERVE' | 'TEMPLATE';

  // 예약 번호
  reserveId?: number;
}
