import { seos } from '@/assets/seos';
import NameTimeType from '@/components/AddTemplate/NameTimeType';
import Seo from '@/components/Seo';
import { useDisabled } from '@/hooks';

const First = () => {
  useDisabled();
  return (
    <>
      <Seo {...seos.template} />
      <NameTimeType />
    </>
  );
};

export default First;
