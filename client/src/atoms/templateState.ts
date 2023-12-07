import { MyTemplate } from '@/@types/MyTemplate';
import { atom } from 'jotai';

export const initTemplateState: MyTemplate = {
  uuid: '',
  title: '',
  day: '',
  time: 0,
  usePerson: 0,
  startTime: '',
  finishTime: '',
  people: [],
  semina: [],
  type: '회의',
  seminarType: '세미나실',
};

export const templateState = atom<MyTemplate>(initTemplateState);
export const myTemplateListState = atom<MyTemplate[]>([]);
