import { css } from '@emotion/react';

type Direction = 'row' | 'column';
type JustifyContent =
  | 'between'
  | 'around'
  | 'evenly'
  | 'center'
  | 'start'
  | 'end';
type AlignItems = 'between' | 'around' | 'evenly' | 'center' | 'start' | 'end';

const justifyContentMap: Record<JustifyContent, string> = {
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
};

const alignItemsMap: Record<AlignItems, string> = {
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
};

/** display flex injector */
export const flex = (
  direction: Direction,
  justifyContent: JustifyContent,
  alignItems: AlignItems,
  gap: number,
) => {
  return css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justifyContentMap[justifyContent]};
    align-items: ${alignItemsMap[alignItems]};
    gap: ${gap}rem;
  `;
};