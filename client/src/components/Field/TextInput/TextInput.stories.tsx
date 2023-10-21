import type { StoryObj } from '@storybook/react';
import TextInput from '.';

const meta = {
  title: 'Field/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: '값을 입력해주세요',
    warning: false,
  },
};

export const Input: Story = {
  args: {
    value: '입력 값 입니다.',
    warning: false,
  },
};

export const Warning: Story = {
  args: {
    value: '입력 값 입니다.',
    warning: true,
  },
};

export const WarningCaption: Story = {
  args: {
    value: '입력 값 입니다.',
    warning: true,
    warningCaption: '경고 문구입니다.',
  },
};
