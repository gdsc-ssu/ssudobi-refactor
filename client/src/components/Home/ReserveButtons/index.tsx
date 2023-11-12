import ReservationButton from '@/components/Buttons/Reservation';
import { flex } from '@/styles/tokens';
import styled from '@emotion/styled';
import bubble1 from '@/assets/svg/bubble1.svg';
import bubble2 from '@/assets/svg/bubble2.svg';
import bubble3 from '@/assets/svg/bubble3.svg';
import cloud from '@/assets/svg/cloud.svg';
import lock1 from '@/assets/svg/lock1.svg';
import talk from '@/assets/svg/talk.svg';
import { injectAnimation } from '@/styles/animations';
import { useRouter } from 'next/router';

const assetArray = [
  [bubble3, bubble2, lock1],
  [talk, bubble1, cloud],
];

const ReserveButtons = () => {
  const router = useRouter();

  const configs = [
    {
      title: '세미나실',
      subtitle: '#회의 #미팅 #강의 #세션',
      assets: assetArray[0],
      buttonStyleType: 'blue',
      onClick: () => router.push('/'),
    },
    {
      title: '개방형 세미나실',
      subtitle: '#학습 #쾌적',
      assets: assetArray[1],
      buttonStyleType: 'skyblue',
      onClick: () => router.push('/'),
    },
  ];

  //@ts-ignore
  return <ButtonsWrapper>{configs.map(ReservationButton)}</ButtonsWrapper>;
};

const ButtonsWrapper = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1.2)};
  ${injectAnimation('fadeInTopDownTranslate', '0.5s')};
`;

export default ReserveButtons;
