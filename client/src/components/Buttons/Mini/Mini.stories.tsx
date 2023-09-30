import type { StoryObj } from '@storybook/react';
import MiniButton from '.';

const meta = {
  title: 'Buttons/MiniButton',
  component: MiniButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '확인',
    theme: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    title: '닫기',
    theme: 'primary',
    disabled: true,
  },
};

export const White: Story = {
  args: {
    title: '확인',
    theme: 'white',
  },
};
