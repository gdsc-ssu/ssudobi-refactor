import type { StoryObj } from '@storybook/react';
import { TitleHeader } from '.';

const meta = {
  title: 'Layout/HomeHeader',
  component: TitleHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
