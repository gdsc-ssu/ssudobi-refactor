import type { StoryObj } from '@storybook/react';
import ConfirmReservationModal from '.';

const meta = {
  title: 'BottomModal/ConfirmReservation',
  component: ConfirmReservationModal,
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
    companions: [
      {
        alternativeId: 'c002d415-f0f4-4111-90f8-a329cc9b31fe',
        id: '227974',
        memberNo: '20180806',
        name: '정명진',
      },
      {
        alternativeId: '4adcb026-ab3f-49d0-bfbc-81d1327a49ad',
        id: '240341',
        memberNo: '20182665',
        name: '김수진',
      },
    ],
    seminaRoom: ['3번'],
    type: 1,
    date: '2023-11-09',
    setIsSuccess: () => {},
  },
};
