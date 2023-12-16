export function getDayOfWeek(dateString: string): string {
  const daysOfWeek = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const date = new Date(dateString.split(' ')[0]);
  const dayOfWeek = date.getDay();
  return daysOfWeek[dayOfWeek];
}
