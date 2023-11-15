import { MateItemType } from 'Mate';
import { Patron } from 'Template';

export interface MyTemplate {
  title: string;
  day: string;
  time: number;
  usePerson: number;
  startTime: string;
  finishTime: string;
  people: Array<Patron>;
  seminarType: '개방형' | '세미나';
  semina: number[];
  type: string;
}
