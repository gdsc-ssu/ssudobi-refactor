import { PatronInfo } from '@/@types/ReservationList';
import { MateItemType } from 'Mate';
import { Patron } from 'Template';

export interface TemplateProps {
  // template 제목
  title: string;
  // template 시작 시간, 끝나는 시간
  beginTime: string;
  endTime: string;
  // template 장소
  place?: string;
  // template 동반이용자
  friends: PatronInfo[] | Array<MateItemType>;

  // 보여지는 페이지가 예약페이지인지 템플릿 페이지 인지
  type: 'RESERVE' | 'TEMPLATE';
  day?: string;
  // 예약 번호
  reserveId?: number;
  idx: number;
  // onClick 함수
  onClick: (idx: number) => void;
}
