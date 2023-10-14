import type { StoryObj } from '@storybook/react';
import Profile from '.';

const meta = {
  title: 'Layout/Profile',
  component: Profile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '이준규',
    memberNo: '20180399',
    id: '112',
  },
};
