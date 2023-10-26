export interface TemplateProps {
  // template 제목
  title: string;
  // template 시간
  time: string;
  // template 장소
  place: string;
  // template 메모
  memo: string;
  // template 동반이용자
  friends: Array<string>;
}
