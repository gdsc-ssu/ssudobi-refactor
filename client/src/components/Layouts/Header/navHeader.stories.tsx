import type { StoryObj } from '@storybook/react';
import { NavHeader } from '.';

const meta = {
  title: 'Layout/NavHeader',
  component: NavHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '헤더제목',
  },
};
