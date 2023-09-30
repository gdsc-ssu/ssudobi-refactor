import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { Global } from '@emotion/react';
import reset from '../src/styles/reset';

const GlobalStyles = () => <Global styles={reset} />;

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
