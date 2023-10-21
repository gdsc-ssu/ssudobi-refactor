declare module 'Auth' {
  export type AuthResponse = {
    success: boolean;
    code: string;
    message: string;
    data: AuthData;
  };

  export type AuthData = {
    availableHomepages: number[];
    isPrivacyPolicyAgree: boolean;
    privacyPolicyAgreePeriod: number;
    dept: Dept;
    accessToken: string;
    parentDept: UserDept;
    branch: Branch;
    showMobileMain: boolean;
    memberNo: string;
    alternativeId: string;
    lastUpdated: string;
    branchGroup: BranchGroup;
    isPortalLogin: boolean;
    patronType: PatronType;
    disableServices: string[];
    hasFamily: boolean;
    name: string;
    printMemberNo: string;
    patronState: PatronState;
    id: number;
    multiTypePatrons: any[];
    isExpired: boolean;
    isFamilyLogin: boolean;
  };

  export type UserDept = {
    id: number;
    code: string;
    name: string;
  };

  export type Branch = {
    id: number;
    name: string;
    alias: string;
    libraryCode: string;
    sortOrder: number;
  };

  export type BranchGroup = {
    id: number;
    name: string;
  };

  export type PatronType = {
    id: number;
    name: string;
  };

  export type PatronState = {
    id: number;
    name: string;
  };
}
