import type { StoryObj } from '@storybook/react';
import Title from '.';

const meta = {
  title: 'Layout/Title',
  component: Title,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '제목란 입니다.\n제목을 입력해주세요.',
    subtitle: '서브 제목란 입니다. 서브 제목을 입력해주세요!',
    animated: false,
  },
};

export const Animated: Story = {
  args: {
    title: '제목란 입니다.\n제목을 입력해주세요.',
    subtitle: '서브 제목란 입니다. 서브 제목을 입력해주세요!',
    animated: true,
  },
};
