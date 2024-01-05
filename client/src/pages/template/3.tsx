import { seos } from '@/assets/seos';
import TemplateTimeTable from '@/components/AddTemplate/TemplateTimeTable';
import Seo from '@/components/Seo';
import { useDisabled } from '@/hooks';

const Third = () => {
  useDisabled();
  return (
    <>
      <Seo {...seos.template} />
      <TemplateTimeTable />
    </>
  );
};

export default Third;
