import type { StoryObj } from '@storybook/react';
import DateButton from '.';

const meta = {
  title: 'Buttons/DateButton',
  component: DateButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Abled: Story = {
  args: {
    title: '12시',
    disabled: false,
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    title: '12시',
    disabled: true,
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    title: '12시',
    disabled: false,
    checked: true,
  },
};
