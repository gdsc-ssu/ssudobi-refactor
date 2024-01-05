import { seos } from '@/assets/seos';
import CompanionsSelect from '@/components/AddTemplate/CompanionsSelect';
import Seo from '@/components/Seo';
import { useDisabled } from '@/hooks';

const Second = () => {
  useDisabled();
  return (
    <>
      <Seo {...seos.template} />
      <CompanionsSelect />
    </>
  );
};

export default Second;
