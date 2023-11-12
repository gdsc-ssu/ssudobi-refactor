import StudentApi from '@/apis/student';
import { MateItemType } from 'Mate';
import { useEffect, useState } from 'react';
import { useToast } from '.';

const MATE_KEY = 'MATE_KEY';

const useMate = () => {
  const studentApi = new StudentApi();
  const { showToast } = useToast();
  const [mateList, setMateList] = useState<MateItemType[]>([]);
  const [isErr, setIsErr] = useState(false);
  const [selectedList, setSelectedList] = useState<MateItemType[]>([]);

  /**
   * 메이트 정보 받아오기 & 갱신
   */
  const getMateList = () => {
    const savedMates = localStorage.getItem(MATE_KEY);
    if (savedMates) setMateList(JSON.parse(savedMates));
  };

  /**
   * 새 메이트 추가하기
   */
  const saveMateList = async (name: string, sId: string): Promise<boolean> => {
    const finding = mateList.some((mate) => mate.info.sId === sId);
    if (finding) {
      setIsErr(true);
      return false;
    }

    try {
      const newMateId = await studentApi.getStudentId({ name, sId });
      setIsErr(false);
      const newMateList = [
        ...mateList,
        {
          info: {
            name,
            sId,
          },
          id: newMateId.id,
        },
      ];
      localStorage.setItem(MATE_KEY, JSON.stringify(newMateList));
      setMateList(newMateList);
      showToast('positive', '메이트 추가가 완료되었습니다.');
      return true;
    } catch (err) {
      console.log(err);
      setIsErr(true);
      return false;
    }
  };

  /**
   * 특정 메이트 제거
   */
  const removeMate = (info: MateItemType) => {
    const newMateList = mateList.filter((mate) => mate.id !== info.id);
    localStorage.setItem(MATE_KEY, JSON.stringify(newMateList));
    setMateList(newMateList);
  };

  /**
   * 선택된 아이템인지 체크
   */
  const isSelected = (list: MateItemType[] | undefined, item: MateItemType) => {
    if (!list) return false;
    const res = list.some((el) => el.id === item.id);
    return res;
  };

  /**
   * selectable) 메이트 선택
   */
  const handleSelect = (info: MateItemType) => {
    const selected = isSelected(selectedList, info);
    if (selected)
      setSelectedList((prev) => prev.filter((el) => el.id !== info.id));
    else setSelectedList((prev) => [...prev, info]);
  };

  useEffect(() => {
    getMateList();
  }, []);

  return {
    mateList,
    getMateList,
    saveMateList,
    removeMate,
    isErr,
    selectedList,
    handleSelect,
    isSelected,
  };
};

export default useMate;
