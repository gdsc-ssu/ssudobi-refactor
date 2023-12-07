import { MateItemType } from 'Mate';

export type UsageType = '학습' | '회의' | '기타' | '수업';

export type Seminartype = '개방형 세미나실' | '세미나실';

export interface MyTemplate {
  uuid: string;
  title: string;
  day: string;
  time: number;
  usePerson: number;
  startTime: string;
  finishTime: string;
  people: Array<MateItemType>;
  seminarType: Seminartype;
  semina: number[];
  type: UsageType;
}
