import { MateItemType } from 'Mate';

export interface MyTemplate {
  title: string;
  place: string;
  day: string;
  time: number;
  usePerson: number;
  startTime: string;
  finishTime: string;
  people: Array<MateItemType>;
  seminarType: '개방형' | '세미나';
  semina: number[];
  type: string;
}
