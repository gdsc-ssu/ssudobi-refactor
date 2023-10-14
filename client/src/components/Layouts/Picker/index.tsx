import DateButton from '@/components/Buttons/Item';
import { COLORS } from '@/styles/colors';
import { flex } from '@/styles/tokens';
import { TYPO } from '@/styles/typo';
import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';
import { cloneDeep } from 'lodash';
import { ComponentProps, useState } from 'react';

type ItemType = 'Info' | 'Week';

type ContentType = {
  title: string;
  disabled: boolean;
};

interface Props extends ComponentProps<'div'> {
  /**
   * 선택하는 아이템의 종류 (Info / Week)
   */
  itemType: ItemType;
  /**
   * 제목
   */
  title: string;
  /**
   * 버튼 내용 배열
   */
  contents: ContentType[];
  /**
   * 복수 선택 가능 여부
   */
  isMultiple: boolean;
  /**
   * 선택 완료시 set 해줄 함수
   */
  itemSetter: (item: string[]) => void;
}

const DatePicker = ({
  itemType,
  title,
  contents,
  isMultiple,
  itemSetter,
  ...props
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  /** 존재하는지 찾ㅈ기 */
  const isHavingItem = (item: string) => {
    if (selectedItem.includes(item)) return true;
    return false;
  };

  /**---아이템 선택 함수---*/
  const selectItem = (item: string) => {
    let newItems = cloneDeep(selectedItem);
    /**---선택된 아이템의 경우---*/
    if (isHavingItem(item))
      newItems = newItems.filter((prevItem) => prevItem !== item);
    /**---선택되지 않은 아이템의 경우---*/ else {
      //복수 선택이 가능한 경우
      if (isMultiple) newItems = [...newItems, item];
      //복수 선택이 불가능한 경우
      else newItems = [item];
    }

    setSelectedItem(newItems);
    itemSetter(newItems);
    return;
  };

  return (
    <Container {...props}>
      <Title>{title}</Title>
      <Wrapper css={wrapperStyle[itemType]}>
        {contents.map((content) => (
          <DateButton
            {...content}
            onClick={() => selectItem(content.title)}
            checked={isHavingItem(content.title)}
            key={content.title}
          />
        ))}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  ${flex('column', 'start', 'start', 1)};
`;

const Title = styled.span`
  ${TYPO.text1.Reg};
  color: ${COLORS.grey0};
`;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 0.8rem;
`;

const wrapperStyle: { [key: string]: SerializedStyles } = {
  Week: css`
    grid-template-columns: repeat(5, 1fr);
  `,
  Info: css`
    grid-template-columns: repeat(4, 1fr);
  `,
};

export default DatePicker;
