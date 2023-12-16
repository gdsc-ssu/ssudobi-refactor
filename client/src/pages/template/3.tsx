import { seos } from '@/assets/seos';
import TemplateTimeTable from '@/components/AddTemplate/TemplateTimeTable';
import Seo from '@/components/Seo';

const Third = () => {
  return (
    <>
      <Seo {...seos.template} />
      <TemplateTimeTable />
    </>
  );
};

export default Third;
