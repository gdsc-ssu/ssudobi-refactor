import * as styles from './Filter.styles';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import SlideDown from '@/assets/svg/SlideDown.svg';
import SlideTop from '@/assets/svg/SlideTop.svg';

interface FProps {
  time: string;
  place: string;
  child: ReactNode;
}

export default function Filter({ time, place, child }: FProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div>
        <styles.FilterBox expanded={isExpanded}>
          <styles.FilterHeaderDiv expanded={isExpanded}>
            <styles.FilterHeaderHalf>
              <styles.FilterHeaderText>사용시간</styles.FilterHeaderText>
              <styles.FilterText>{time}분</styles.FilterText>
            </styles.FilterHeaderHalf>
            <styles.FilterHeaderHalf>
              <styles.FilterHeaderText>장소종류</styles.FilterHeaderText>
              <styles.FilterText>{place}</styles.FilterText>
            </styles.FilterHeaderHalf>
          </styles.FilterHeaderDiv>

          {isExpanded && (
            <>
              <styles.FilterDiv>{child}</styles.FilterDiv>
            </>
          )}
          <styles.FilterFlexBox>
            <styles.FilterButton expanded={isExpanded}>
              {isExpanded ? (
                <SlideTop onClick={handleButtonClick} />
              ) : (
                <SlideDown onClick={handleButtonClick} />
              )}
            </styles.FilterButton>
          </styles.FilterFlexBox>
        </styles.FilterBox>
      </div>
    </>
  );
}
