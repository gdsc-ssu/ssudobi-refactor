import type { StoryObj } from '@storybook/react';
import SelectSeminarRoomModal from '.';

const meta = {
  title: 'BottomModal/SelectSeminarRoom',
  component: SelectSeminarRoomModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slotDay: '11-09',
    day: '목요일',
    startTime: '12:30',
    endTime: '14:30',
    seminaRoomContents: [
      {
        disabled: false,
        title: '1번',
      },
      {
        disabled: false,
        title: '2번',
      },
      {
        disabled: false,
        title: '3번',
      },
      {
        disabled: false,
        title: '4번',
      },
      {
        disabled: false,
        title: '5번',
      },
    ],

    seminaRoom: [],
    setSeminaRoom: () => {},
    setIsSeminaRoomSelected: () => {},
    type: 'template',
  },
};
