import type { StoryObj } from '@storybook/react';
import HomeTemplate from './HomeTemplate';

const meta = {
  title: 'TemplatesList/HomeTemplate',
  component: HomeTemplate,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Reserve: Story = {
  args: {
    title: '템플릿 제목',
    beginTime: '목요일 13시',
    endTime: '15시 30분',
    place: 3,
    memo: '슈도비 회의 잊지말기',
    friends: [
      { name: '정명진', sId: '2080199' },
      { name: '이준규', sId: '20801929' },
    ],
    day: 'Sun',
  },
};
