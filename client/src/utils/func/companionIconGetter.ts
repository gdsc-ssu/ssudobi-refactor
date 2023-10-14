import _1 from '@/assets/svg/logo-blue.svg';
import _2 from '@/assets/svg/logo-skyblue.svg';
import _3 from '@/assets/svg/logo-red.svg';
import _4 from '@/assets/svg/logo-yellow.svg';

const iconArr = [_1, _2, _3, _4];

/**
 * 아이콘 랜덤 추출기
 */
export const companionIconGetter = () => {
  const randomIndex = Math.floor(Math.random() * iconArr.length);
  return iconArr[randomIndex];
};
