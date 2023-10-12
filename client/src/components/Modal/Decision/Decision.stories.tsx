import type { StoryObj } from '@storybook/react';
import DecisionModal from '.';

const meta = {
  title: 'Modal/Decision',
  component: DecisionModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '모달 제목입니다',
    message: '모달 내용입니다',
    onCancle: () => {},
    onConfirm: () => {},
    isOpen: false,
  },
};
