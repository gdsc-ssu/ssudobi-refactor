import type { StoryObj } from '@storybook/react';
import ItemButton from '.';

const meta = {
  title: 'Buttons/ItemButton',
  component: ItemButton,
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
