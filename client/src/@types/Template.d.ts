declare module 'Template' {
  export type WeekdayShort =
    | 'Sun'
    | 'Mon'
    | 'Tue'
    | 'Wed'
    | 'Thu'
    | 'Fri'
    | 'Sat';
  export type Patron = {
    name: string;
    sId: string;
  };
  export type TemplateInfo = {
    // template 제목
    title: string;
    day: WeekdayShort;
    // template 시작 시간, 끝나는 시간
    beginTime: string;
    endTime: string;
    // template 장소
    place: number;
    // template 메모
    memo: string;
    // template 동반이용자
    friends: Array<Patron>;
  };
}
