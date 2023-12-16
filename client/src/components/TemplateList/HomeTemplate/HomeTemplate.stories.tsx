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
    place: '세미나룸 102호',
    memo: '슈도비 회의 잊지말기',
    friends: ['정명진 / 20181234', '이준규 / 20181234'],
  },
};
