import type { StoryObj } from '@storybook/react';
import ToastBox from './ToastBox';

const meta = {
  title: 'Layout/ToastBox',
  component: ToastBox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: 'positive',
    content: '임시 토스트 메시지입니다.',
  },
};

export const Positive: Story = {
  args: {
    theme: 'positive',
    content: '임시 토스트 메시지입니다.',
  },
};

export const Negative: Story = {
  args: {
    theme: 'negative',
    content: '임시 토스트 메시지입니다.',
  },
};
