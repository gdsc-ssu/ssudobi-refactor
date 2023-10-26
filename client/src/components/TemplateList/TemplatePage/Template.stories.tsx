import type { StoryObj } from '@storybook/react';
import Template from './Template';

const meta = {
  title: 'TemplatesList/Template',
  component: Template,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateComponent: Story = {
  args: {
    title: '템플릿 제목',
    time: '목요일 12시 - 15시 30분',
    place: '세미나룸 102호',
    memo: '슈도비 회의 잊지말기',
    friends: ['김수진 / 20191234', '이준규 / 20181234'],
  },
};
