import { seos } from '@/assets/seos';
import CompanionsSelect from '@/components/AddTemplate/CompanionsSelect';
import Seo from '@/components/Seo';

const Second = () => {
  return (
    <>
      <Seo {...seos.template} />
      <CompanionsSelect />
    </>
  );
};

export default Second;
