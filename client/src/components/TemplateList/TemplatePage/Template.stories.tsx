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
    beginTime: '목요일 12시',
    endTime: '15시',
    place: '세미나룸 102호',
    type: 'RESERVE',
    idx: 1,
    friends: [{ name: '정명진', sId: '2080199' }],
  },
};
