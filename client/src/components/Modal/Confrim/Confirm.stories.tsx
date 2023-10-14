import type { StoryObj } from '@storybook/react';
import ConfirmModal from '.';

const meta = {
  title: 'Modal/Confirm',
  component: ConfirmModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '모달 제목입니다',
    message: '모달 내용입니다',
  },
};
