import { useHeader } from '@/hooks';
import { PageContainer } from '@/styles/tokens';
import { useEffect, useLayoutEffect, useState } from 'react';
import { MyTemplate } from '@/@types/MyTemplate';
import { useAtom } from 'jotai';
import { templateAtom } from '.';
import Link from 'next/link';

const TemplateTimeTable = () => {
  const { setHeader } = useHeader();
  useLayoutEffect(() => {
    setHeader('템플릿 추가하기');
  }, []);

  const [templateArr, setTemplateArr] = useState<MyTemplate[]>([]);

  const [template, setTemplate] = useAtom<MyTemplate>(templateAtom);

  console.log('tem', template);

  useEffect(() => {
    const storedCompanionMember = localStorage.getItem('templateArr');
    if (storedCompanionMember) {
      setTemplateArr(JSON.parse(storedCompanionMember));
    }
  }, []);

  useEffect(() => {
    // templateArr가 변경될 때마다 로컬 스토리지에 업데이트
    localStorage.setItem('templateArr', JSON.stringify(templateArr));
    console.log(templateArr);
  }, [templateArr]);

  const handleSaveTemplate = () => {
    const newTemplate = {
      title: template.title,
      seminarType: template.seminarType,
      day: '목요일', // template.day,
      startTime: '13:00',
      finishTime: '14:00',
      people: template.people,
      semina: [1, 3, 4],
      usePerson: template.usePerson,
      type: template.type,
      time: template.time,
    };
    console.log(newTemplate);
    setTemplateArr((res) => [...res, newTemplate]);
    console.log('temparr', templateArr);
  };

  return (
    <>
      <PageContainer>
        {/* TODO: 시간표 + 바텀모달 추가하기 */}
        <button onClick={handleSaveTemplate}>
          <Link href={'/template'}>저장하기</Link>
        </button>
      </PageContainer>
    </>
  );
};

export default TemplateTimeTable;
