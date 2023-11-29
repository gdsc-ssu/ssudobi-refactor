import { Patron } from 'Template';

export interface MyTemplate {
  title: string;
  day: string;
  time: number;
  usePerson: number;
  startTime: string;
  finishTime: string;
  people: Array<Patron>;
  seminarType: '개방형 세미나실' | '세미나실';
  semina: number[];
  type: '학습' | '회의' | '기타' | '수업';
}
