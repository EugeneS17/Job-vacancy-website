import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Header } from './components/Header/Header';
import { VacancyListPage } from './pages/VacancyListPage/VacancyListPage';
import './App.css';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <main>
        <VacancyListPage />
      </main>
    </MantineProvider>
  );
}

export default App;
