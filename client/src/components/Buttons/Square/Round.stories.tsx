import type { StoryObj } from '@storybook/react';
import SquareButton from '.';

const meta = {
  title: 'Buttons/SquareButton',
  component: SquareButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '버튼 제목입니다',
    theme: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    title: '버튼 제목입니다',
    theme: 'primary',
    disabled: true,
  },
};

export const White: Story = {
  args: {
    title: '버튼 제목입니다',
    theme: 'white',
  },
};
