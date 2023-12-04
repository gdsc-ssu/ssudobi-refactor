import { MyTemplate, Seminartype, UsageType } from '@/@types/MyTemplate';
import { useAtom } from 'jotai';
import { useHeader } from '.';
import { editingState } from '@/atoms/editingState';
import { useRouter } from 'next/router';
import {
  initTemplateState,
  myTemplateListState,
  templateState,
} from '@/atoms/templateState';
import { ChangeEvent } from 'react';
import { MateItemType } from 'Mate';
import { v4 as uuidv4 } from 'uuid';

export type RouteType = 'create' | 'edit';
export type StageType = 'name' | 'companion' | 'time';

const useTemplate = () => {
  /**---------- state, atom, custom hook ----------**/
  const [template, setTemplate] = useAtom(templateState);
  const [editing, setEditing] = useAtom(editingState);
  const [templateList, setTemplateList] = useAtom(myTemplateListState);
  const router = useRouter();
  const { setHeader } = useHeader();

  /**---------- 템플릿 정보 관리 관련 ----------**/
  const getMyTemplateList = () => {
    const prevTemplates = localStorage.getItem('templateArr');
    if (prevTemplates) setTemplateList(JSON.parse(prevTemplates));
    else setTemplateList([]);
  };

  /**---------- 템플릿 페이지 세팅 관련 함수 ----------**/
  /**
   * 페이지 헤더 세팅
   */
  const settingHeader = () => {
    if (editing) setHeader('템플릿 수정하기');
    else setHeader('템플릿 추가하기');
  };

  /**
   * 템플릿 페이지 이동 (생성 / 수정 선택)
   */
  const handleRouteTemplate = (
    type: RouteType,
    selectedTemplate?: MyTemplate,
  ) => {
    switch (type) {
      case 'create':
        setEditing(false);
        setTemplate(initTemplateState);
        break;
      case 'edit':
        setEditing(true);
        setTemplate(selectedTemplate!);
        break;
    }
    router.push('/template/1');
  };

  /**
   * 단계 이동 관련 함수
   */
  const handleNextStage = (stage: StageType) => {
    switch (stage) {
      case 'name':
        router.push('/template/2');
        break;
      case 'companion':
        router.push('/template/3');
        break;
      case 'time':
        saveTemplate(editing ? 'edit' : 'create');
        break;
    }
  };

  /**---------- 템플릿 정보 세팅 관련 함수 ----------**/
  /**
   * 템플릿 이름 설정
   */
  const settingTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTemplate((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  /**
   * 템플릿 사용 시간 설정
   */
  const settingTime = (time: number) => {
    setTemplate((prev) => {
      return {
        ...prev,
        time: time,
      };
    });
  };

  /**
   * 템플릿 사용 용도 설정
   */
  const settingUsage = (usage: UsageType) => {
    setTemplate((prev) => {
      return {
        ...prev,
        type: usage,
      };
    });
  };

  /**
   * 세미나룸 선택
   */
  const settingSeminarType = (type: Seminartype) => {
    setTemplate((prev) => {
      return {
        ...prev,
        seminarType: type,
      };
    });
  };

  /**
   * 세미나룸 선택
   */
  const settingCompanion = (selectedList: MateItemType[]) => {
    setTemplate((prev) => {
      return {
        ...prev,
        people: selectedList,
        usePerson: selectedList.length,
      };
    });
  };

  /**
   * 세미나룸 예약 정보 선택
   */
  const settingReservationInfo = (
    day: string,
    startTime: string,
    finishTime: string,
    semina: number[],
  ) => {
    setTemplate((prev) => {
      return {
        ...prev,
        day,
        startTime,
        finishTime,
        semina,
      };
    });
  };

  /**
   * 템플릿 저장 / 갱신
   */
  const saveTemplate = (type: RouteType) => {
    switch (type) {
      case 'create':
        const newTemplate: MyTemplate = {
          ...template,
          uuid: uuidv4(),
        };
        localStorage.setItem(
          'templateArr',
          JSON.stringify([...templateList, newTemplate]),
        );
        getMyTemplateList();
        break;
      case 'edit':
        const newTemplates: MyTemplate[] = [
          ...templateList.filter((item) => item.uuid !== template.uuid),
          template,
        ];
        localStorage.setItem('templateArr', JSON.stringify(newTemplates));
        break;
    }
    setTemplate(initTemplateState);
  };

  return {
    settingHeader,
    settingTitle,
    settingUsage,
    settingSeminarType,
    settingCompanion,
    settingTime,
    settingReservationInfo,
    handleRouteTemplate,
    handleNextStage,
    getMyTemplateList,
    template,
    editing,
    templateList,
  };
};

export default useTemplate;
