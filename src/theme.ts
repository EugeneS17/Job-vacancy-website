import { createTheme } from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';

const blue: MantineColorsTuple = [
  '#F6F6F7',
  '#DBE4FF',
  '#BAC8FF',
  '#91A7FF',
  '#748FFC',
  '#5C7CFA',
  '#4C6EF5',
  '#4263EB',
  '#3B5BDB',
  '#364FC7',
];

export const theme = createTheme({
  fontFamily: '"Open Sans", sans-serif',
  primaryColor: 'blue',
  colors: {
    blue,
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Card: {
      defaultProps: {
        radius: 'sm',
        shadow: 'none',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Select: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },
});
