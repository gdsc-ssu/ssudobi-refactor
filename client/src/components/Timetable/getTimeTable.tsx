import axios from 'axios';

const falseData = {
  '0900': false,
  '0930': false,
  '1000': false,
  '1030': false,
  '1100': false,
  '1130': false,
  '1200': false,
  '1230': false,
  '1300': false,
  '1330': false,
  '1400': false,
  '1430': false,
  '1500': false,
  '1530': false,
  '1600': false,
  '1630': false,
  '1700': false,
  '1730': false,
  '1800': false,
  '1830': false,
  '1900': false,
  '1930': false,
  '2000': false,
  '2030': false,
};

export type TimeSlot = {
  [time: string]: boolean;
};

export type WeeklyData = {
  [date: string]: TimeSlot;
};

export type RoomData = {
  [date: string]: {
    [room: string]: number[][] | null;
  };
};

export function processAvailabilityData(
  roomData: RoomData,
  targetRooms: string[],
): WeeklyData[] {
  const weekData: WeeklyData = {};
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, '0');
  const currentMinute = now.getMinutes().toString().padStart(2, '0');
  const currentTime = currentHour + currentMinute;
  const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  // roomData 기준으로 예약 가능한 시간을 초기화한다.
  Object.keys(roomData).forEach((date) => {
    weekData[date] = {};
    for (let i = 9; i <= 20; i++) {
      for (let j = 0; j < 60; j += 30) {
        const time =
          i.toString().padStart(2, '0') + j.toString().padStart(2, '0');
        weekData[date][time] = true;

        // 현재 날짜와 시간을 체크
        if (
          (date === currentDate && parseInt(time) <= parseInt(currentTime)) ||
          date < currentDate
        ) {
          weekData[date][time] = false;
        }
      }
    }
  });

  Object.keys(roomData).forEach((date) => {
    if (!weekData[date]) return;

    const roomsToCheck =
      targetRooms.length !== 0 ? targetRooms : Object.keys(roomData[date]); // targetRooms가 있으면 그것을 사용, 없으면 모든 방을 사용
    const totalRooms = roomsToCheck.length;

    Object.keys(weekData[date]).forEach((time) => {
      let bookedRooms = 0;

      roomsToCheck.forEach((room) => {
        const roomReservations = roomData[date][room];

        if (roomReservations) {
          roomReservations.forEach(([start, end]) => {
            for (let t = start; t <= end; t++) {
              const timeStr = t.toString().padEnd(4, '0');
              if (timeStr === time) {
                bookedRooms++;
              }
            }
          });
        }
      });

      // 모든 세미나실이 예약되어 있는 경우에만 false로 설정
      if (bookedRooms >= totalRooms) {
        weekData[date][time] = false;
        const curHour = time.slice(0, 2);
        const curMin = time.slice(2);
        const nextTime =
          curMin === '00'
            ? curHour + `${parseInt(curMin) + 30}`
            : `${parseInt(curHour) + 1}` + `${parseInt(curMin) + 30}`;
        if (weekData[date][nextTime] !== undefined) {
          weekData[date][nextTime] = false;
        }
      }
      // 현재 시간에서 30분 더한 시간을 계산
    });
  });

  const sortedDates = Object.keys(weekData).sort();
  const weekArray = [];

  let startIndex = 0;
  let firstWeekProcessed = false;

  for (let i = 0; i < sortedDates.length; ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const singleWeek: any = {};

    if (!firstWeekProcessed) {
      const firstDate = new Date(sortedDates[i]);
      const firstDay = firstDate.getDay();

      if (firstDay > 1 && firstDay <= 6) {
        for (let j = 1; j < firstDay; j++) {
          const prevDate = new Date(firstDate);
          prevDate.setDate(firstDate.getDate() - (firstDay - j));
          const prevDateStr = prevDate.toISOString().split('T')[0];
          singleWeek[prevDateStr] = Object.fromEntries(
            Object.keys(weekData[sortedDates[i]]).map((time) => [time, false]),
          );
        }

        for (let j = 0; j < 6 - firstDay + 1; j++) {
          const date = sortedDates[i + j];
          if (date) {
            singleWeek[date] = weekData[date];
          }
        }

        startIndex = i + (6 - firstDay + 1);
      } else {
        for (let j = 0; j < 6; j++) {
          const date = sortedDates[i + j];
          if (date) {
            singleWeek[date] = weekData[date];
          }
        }

        startIndex = i + 6;
      }

      weekArray.push(singleWeek);
      firstWeekProcessed = true;
      i = startIndex;
    } else {
      for (let j = 0; j < 6; j++) {
        const date = sortedDates[i + j];
        if (date) {
          singleWeek[date] = weekData[date];
        }
      }

      weekArray.push(singleWeek);
      i += 6;
    }
  }
  const lastArrayDaysLength = Object.keys(
    weekArray[weekArray.length - 1],
  ).length;

  if (lastArrayDaysLength !== 6) {
    for (let i = 0; i < 6 - lastArrayDaysLength; i++) {
      const lastWeekDayKeys = Object.keys(weekArray[weekArray.length - 1]);
      const lastDate = lastWeekDayKeys[lastWeekDayKeys.length - 1];
      const emptyData = JSON.parse(JSON.stringify(falseData));
      const newEmptyDate = addOneDay(lastDate);
      weekArray[weekArray.length - 1][newEmptyDate] = emptyData;
    }
  }

  return weekArray;
}

function addOneDay(inputDate: string): string {
  // "YYYY-MM-DD" 형태의 문자열을 Date 객체로 변환
  const dateParts = inputDate.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // 월은 0부터 시작하기 때문에 1을 빼기
  const day = parseInt(dateParts[2], 10);

  const date = new Date(year, month, day);

  // 하루를 더함
  date.setDate(date.getDate() + 1);

  // Date 객체를 "YYYY-MM-DD" 형태의 문자열로 변환
  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하기 때문에 1을 더함
  const nextDay = String(date.getDate()).padStart(2, '0');

  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export const getTimeTable = async () => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}test/read`;
    const headers = {
      Accept: 'application/json, text/plain, */*',
    };
    // API 호출
    const response = await axios.get(apiUrl, { headers });

    // 응답 데이터 확인
    const { data } = response;
    const { status } = response;

    if (status === 200) {
      console.log(data.data);
      return data.data as RoomData;
    } else {
      // 로그인 실패
    }
  } catch (error) {
    console.error('오류:', error);
  }
};
