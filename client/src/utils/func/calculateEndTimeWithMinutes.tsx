export const calculateEndTimeWithMinutes = (time: string, minutes: number) => {
  const hours = parseInt(time.slice(0, 2));
  const originalMinutes = parseInt(time.slice(2));
  const totalMinutes = hours * 60 + originalMinutes + minutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(
    2,
    '0',
  )}`;
};
