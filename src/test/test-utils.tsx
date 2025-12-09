import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from '../store/vacanciesSlice';
import { theme } from '../theme';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: ReturnType<typeof setupStore>;
}

function setupStore() {
  return configureStore({
    reducer: { vacancies: vacanciesReducer },
  });
}

export function renderWithProviders(
  ui: ReactNode,
  options: ExtendedRenderOptions = {}
) {
  const {
    store = setupStore(),
    ...renderOptions
  } = options;

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export testing library utilities
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { renderWithProviders as render };

