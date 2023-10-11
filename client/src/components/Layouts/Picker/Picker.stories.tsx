import type { StoryObj } from '@storybook/react';
import Picker from '.';

const meta = {
  title: 'Layout/Picker',
  component: Picker,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const dummyTimes = [
  {
    title: '10시',
    disabled: false,
  },
  {
    title: '11시',
    disabled: true,
  },
  {
    title: '12시',
    disabled: true,
  },
  {
    title: '13시',
    disabled: false,
  },
  {
    title: '14시',
    disabled: false,
  },
  {
    title: '15시',
    disabled: false,
  },
  {
    title: '16시',
    disabled: true,
  },
];

const dummyWeeks = [
  {
    title: '월',
    disabled: false,
  },
  {
    title: '화',
    disabled: false,
  },
  {
    title: '수',
    disabled: false,
  },
  {
    title: '목',
    disabled: false,
  },
  {
    title: '금',
    disabled: false,
  },
];

export const InfoNotMultiple: Story = {
  args: {
    itemType: 'Info',
    title: 'Picker UI 테스트',
    contents: dummyTimes,
    isMultiple: false,
  },
};

export const InfoMultiple: Story = {
  args: {
    itemType: 'Info',
    title: 'Picker UI 테스트',
    contents: dummyTimes,
    isMultiple: true,
  },
};

export const WeekNotMultiple: Story = {
  args: {
    itemType: 'Week',
    title: 'Picker UI 테스트',
    contents: dummyWeeks,
    isMultiple: false,
  },
};

export const WeekMultiple: Story = {
  args: {
    itemType: 'Week',
    title: 'Picker UI 테스트',
    contents: dummyWeeks,
    isMultiple: true,
  },
};
