import { seos } from '@/assets/seos';
import ReservationCheck from '@/components/ReservationCheck';
import Seo from '@/components/Seo';

const Schedule = () => {
  return (
    <>
      <Seo {...seos.schedule} />
      <ReservationCheck />
    </>
  );
};

export default Schedule;
