import { seos } from '@/assets/seos';
import NameTimeType from '@/components/AddTemplate/NameTimeType';
import Seo from '@/components/Seo';

const First = () => {
  return (
    <>
      <Seo {...seos.template} />
      <NameTimeType />
    </>
  );
};

export default First;
