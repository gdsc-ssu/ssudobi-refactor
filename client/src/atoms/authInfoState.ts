import { AuthResponse } from 'Auth';
import { atom } from 'jotai';

export const authInfoState = atom<AuthResponse | null>(null);

export const dummyAuthData: AuthResponse = {
  success: true,
  code: 'successCode_xyz123',
  message: '로그인되었습니다.',
  data: {
    availableHomepages: [42, 69],
    isPrivacyPolicyAgree: true,
    privacyPolicyAgreePeriod: 3,
    dept: {
      id: 456,
      code: 'deptCode_abc789',
      name: '과학학부',
    },
    accessToken: 'xyzabc789ghi',
    parentDept: {
      id: 457,
      code: 'parentDeptCode_def456',
      name: '자연대학',
    },
    branch: {
      id: 123,
      name: '서부도서관',
      alias: '서부',
      libraryCode: 'libCode_ghi123',
      sortOrder: 2,
    },
    showMobileMain: false,
    memberNo: 'member_xyz789',
    alternativeId: 'altid_ghi123',
    lastUpdated: '2023-07-27 15:23:45',
    branchGroup: {
      id: 24,
      name: '서울대학교',
    },
    isPortalLogin: false,
    patronType: {
      id: 34,
      name: '교수',
    },
    disableServices: ['ABC', 'DEF', 'GHI'],
    hasFamily: false,
    name: '홍길동',
    printMemberNo: 'print_xyz456',
    patronState: {
      id: 789,
      name: '퇴직',
    },
    id: 987,
    multiTypePatrons: [],
    isExpired: false,
    isFamilyLogin: false,
  },
};
