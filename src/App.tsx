import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme';
import { Header } from './components/Header/Header';
import { VacancyListPage } from './pages/VacancyListPage/VacancyListPage';
import { VacancyDetailPage } from './pages/VacancyDetailPage/VacancyDetailPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  const basename = import.meta.env.BASE_URL;
  
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter basename={basename}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
            <Route path="/vacancies/:city" element={<VacancyListPage />} />
            <Route path="/vacancy/:id" element={<VacancyDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
