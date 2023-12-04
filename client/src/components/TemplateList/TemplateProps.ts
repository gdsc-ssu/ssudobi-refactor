import { MyTemplate } from '@/@types/MyTemplate';
import { PatronInfo } from '@/@types/ReservationList';
import { MateItemType } from 'Mate';
import { Patron } from 'Template';

export interface TemplateProps {
  selectedTemplate: MyTemplate;
  uuid: string;
  // template 제목
  title: string;
  // template 시작 시간, 끝나는 시간
  beginTime: string;
  endTime: string;
  // template 장소
  place?: string;
  // template 동반이용자
  friends: PatronInfo[] | Array<MateItemType> | Patron[];
  day?: string;
  // 예약 번호
  reserveId?: number;
  idx: number;
  // onClick 함수
  onClick: (idx: number) => void;
  semina?: number[];
}
