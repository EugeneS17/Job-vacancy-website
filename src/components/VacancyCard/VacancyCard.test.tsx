import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { VacancyCard } from './VacancyCard';
import { mockVacancy, mockVacancyWithoutSalary } from '../../test/mocks/vacancies';

describe('VacancyCard', () => {
  it('renders vacancy info correctly', () => {
    render(<VacancyCard vacancy={mockVacancy} />);

    expect(screen.getByText('Frontend-разработчик (React)')).toBeInTheDocument();
    expect(screen.getByText(/150 000 – 250 000/)).toBeInTheDocument();
    expect(screen.getByText('ООО Тест Компания')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
  });

  it('renders "Зарплата не указана" when salary is null', () => {
    render(<VacancyCard vacancy={mockVacancyWithoutSalary} />);

    expect(screen.getByText('Зарплата не указана')).toBeInTheDocument();
  });

  it('renders apply button with correct link', () => {
    render(<VacancyCard vacancy={mockVacancy} />);

    const applyButton = screen.getByRole('link', { name: /откликнуться/i });
    expect(applyButton).toHaveAttribute('href', mockVacancy.alternate_url);
  });
});
