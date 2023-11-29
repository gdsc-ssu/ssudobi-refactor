import { MateItemType } from 'Mate';

export interface MyTemplate {
  title: string;
  day: string;
  time: number;
  usePerson: number;
  startTime: string;
  finishTime: string;
  people: Array<MateItemType>;
  seminarType: '개방형 세미나실' | '세미나실';
  semina: number[];
  type: '학습' | '회의' | '기타' | '수업';
}
