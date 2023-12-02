import { WeekdayShort } from 'Template';

/**
 * 템플릿 요일과, 시작 끝 시간을 넣으면 UI 문자열 반환
 */
export const formatSchedule = (
  day: WeekdayShort,
  startTime: string,
  endTime: string,
): string => {
  const daysMap: Record<WeekdayShort, string> = {
    Sun: '일요일',
    Mon: '월요일',
    Tue: '화요일',
    Wed: '수요일',
    Thu: '목요일',
    Fri: '금요일',
    Sat: '토요일',
  };

  const startHour = parseInt(startTime.split(':')[0]);
  const startMinute = startTime.split(':')[1];

  const endHour = parseInt(endTime.split(':')[0]);
  const endMinute = endTime.split(':')[1];

  return `${daysMap[day]} ${startHour}시 ${startMinute}분 - ${endHour}시 ${endMinute}분`;
};

const getNextWeekdayDate = (
  day: WeekdayShort,
  currentTime: Date = new Date(),
): Date => {
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
    day,
  );
  const date = new Date(currentTime.getTime());
  date.setDate(date.getDate() + ((7 - date.getDay() + dayOfWeek) % 7 || 7));
  if (date <= currentTime) {
    // 이미 해당 요일이 지났다면 다음 주로 설정
    date.setDate(date.getDate() + 7);
  }
  return date;
};

/**
 * 템플릿에 저장된 요일 시작시간, 끝시간 넣으면 예약할 때 사용할 수 있는 시간 반환
 */
export const formatNextOccurrence = (
  day: WeekdayShort,
  startDate: string,
  endDate: string,
): { beginTime: string; endTime: string } => {
  const nextDate = getNextWeekdayDate(day);
  const year = nextDate.getFullYear();
  const month = nextDate.getMonth() + 1;
  const date = nextDate.getDate();

  const beginTime = `${year}-${month.toString().padStart(2, '0')}-${date
    .toString()
    .padStart(2, '0')} ${startDate}`;
  const endTime = `${year}-${month.toString().padStart(2, '0')}-${date
    .toString()
    .padStart(2, '0')} ${endDate}`;

  return { beginTime, endTime };
};
