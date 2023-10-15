import { AuthResponse } from 'Auth';
import { atom } from 'jotai';

export const authInfoState = atom<AuthResponse | null>(null);
