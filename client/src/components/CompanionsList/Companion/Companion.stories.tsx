import type { StoryObj } from '@storybook/react';
import Companion from '.';

const meta = {
  title: 'CompanionsList/Companion',
  component: Companion,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '최상원',
    memberNo: '20180399',
    id: '112',
    isSelected: false,
  },
};
