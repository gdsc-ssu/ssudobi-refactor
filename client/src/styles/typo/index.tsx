import { css } from '@emotion/react';
import { pretendardRegular, pretendardSemibold } from './Pretendard';

export const TEXT_STYLE_SIZE = {
  title1: 'title1',
  title2: 'title2',
  title3: 'title3',
  text1: 'text1',
  text2: 'text2',
  text3: 'text3',
  caption: 'caption',
  label: 'label',
} as const;

export const TEXT_STYLE_WEIGHT = {
  Bd: 'Bd',
  Reg: 'Reg',
} as const;

export const TYPO = {
  [TEXT_STYLE_SIZE.title1]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 3.2rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 3.2rem;
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.title2]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 2.4rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 2.4rem;
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.title3]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 2.1rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 2.1rem;
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text1]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 1.8rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 1.8rem;
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text2]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 1.6rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 1.6rem;
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.text3]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 1.4rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 1.4rem;
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.caption]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 1.2rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 1.2rem;
      font-weight: 400;
    `,
  },
  [TEXT_STYLE_SIZE.label]: {
    [TEXT_STYLE_WEIGHT.Bd]: css`
      font-family: ${pretendardSemibold.style.fontFamily};
      font-size: 1rem;
      font-weight: 600;
    `,
    [TEXT_STYLE_WEIGHT.Reg]: css`
      font-family: ${pretendardRegular.style.fontFamily};
      font-size: 1rem;
      font-weight: 400;
    `,
  },
};
