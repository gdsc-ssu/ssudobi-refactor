import type { StoryObj } from '@storybook/react';
import ReservationButton from '.';
import bubble1 from '@/assets/svg/bubble1.svg';
import bubble2 from '@/assets/svg/bubble2.svg';
import bubble3 from '@/assets/svg/bubble3.svg';
import cloud from '@/assets/svg/cloud.svg';
import lock1 from '@/assets/svg/lock1.svg';
import talk from '@/assets/svg/talk.svg';

const meta = {
  title: 'Buttons/ReservationButton',
  component: ReservationButton,
  tags: ['autodocs'],
};

export default meta;

const assetArray = [
  [bubble3, bubble2, lock1],
  [talk, bubble1, cloud],
];

type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    title: '세미나실',
    subtitle: '#회의 #미팅 #강의 #세션',
    assets: assetArray[0],
    buttonStyleType: 'blue',
  },
};

export const SkyBlue: Story = {
  args: {
    title: '개방형 세미나실',
    subtitle: '#학습 #쾌적',
    assets: assetArray[1],
    buttonStyleType: 'skyblue',
  },
};
