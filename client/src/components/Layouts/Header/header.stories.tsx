import type { StoryObj } from '@storybook/react';
import Header from '.';

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '헤더제목',
  },
};
