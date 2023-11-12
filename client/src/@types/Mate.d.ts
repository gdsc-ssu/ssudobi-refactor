declare module 'Mate' {
  export type StudentIdResponse = {
    id: number;
    name: string;
    memberNo: string;
    alternativeId: string;
  };

  export type MateItemType = {
    info: {
      name: string;
      sId: string;
    };
    id: number;
  };
}
