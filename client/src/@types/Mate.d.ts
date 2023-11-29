declare module 'Mate' {
  export type StudentIdResponse = {
    id: number;
    name: string;
    memberNo: string;
    alternativeId: string;
  };

  export type MateItemType = {
    name?: string;
    memberNo?: string;
    info: {
      name: string;
      sId: string;
      alternativeId: string;
    };
    id: number;
  };
}
