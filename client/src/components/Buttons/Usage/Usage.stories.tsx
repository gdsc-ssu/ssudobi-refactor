import type { StoryObj } from '@storybook/react';
import Usage from '.';

const meta = {
  title: 'Buttons/Usage',
  component: Usage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '수업',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    title: '수업',
    checked: true,
  },
};
