import type { StoryObj } from '@storybook/react';
import FriendCircle from './FriendCircle';

const meta = {
  title: 'Friends/Circle',
  component: FriendCircle,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Friend: Story = {
  args: {
    name: '수진',
    type: 'friend',
  },
};

export const Plus: Story = {
  args: {
    name: '+',
    type: 'plus',
  },
};
