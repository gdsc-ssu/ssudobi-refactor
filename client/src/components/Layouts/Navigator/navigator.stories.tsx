import type { StoryObj } from '@storybook/react';
import Navigator from '.';

const meta = {
  title: 'Layout/Navigator',
  component: Navigator,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    curRoute: '/',
    handleRoute: () => null,
  },
};
