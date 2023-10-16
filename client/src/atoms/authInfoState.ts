import { atom } from 'jotai';

export type authInfoType = {
  name: string;
  sId: string;
};

export const authInfoState = atom<authInfoType | null>(null);
