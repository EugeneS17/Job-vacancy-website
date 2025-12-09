import type { Vacancy, VacanciesResponse } from '../../types/vacancy';

export const mockVacancy: Vacancy = {
  id: '1',
  name: 'Frontend-разработчик (React)',
  area: {
    id: '1',
    name: 'Москва',
    url: 'https://api.hh.ru/areas/1',
  },
  salary: {
    from: 150000,
    to: 250000,
    currency: 'RUR',
    gross: false,
  },
  employer: {
    id: '123',
    name: 'ООО Тест Компания',
    url: 'https://api.hh.ru/employers/123',
    alternate_url: 'https://hh.ru/employer/123',
    vacancies_url: 'https://api.hh.ru/vacancies?employer_id=123',
    accredited_it_employer: true,
    trusted: true,
  },
  published_at: '2024-01-15T10:00:00+0300',
  created_at: '2024-01-15T10:00:00+0300',
  archived: false,
  apply_alternate_url: 'https://hh.ru/applicant/vacancy_response?vacancyId=1',
  alternate_url: 'https://hh.ru/vacancy/1',
  url: 'https://api.hh.ru/vacancies/1',
  experience: {
    id: 'between1And3',
    name: 'От 1 года до 3 лет',
  },
  employment: {
    id: 'full',
    name: 'Полная занятость',
  },
  schedule: {
    id: 'remote',
    name: 'Удалённая работа',
  },
};

export const mockVacancyWithoutSalary: Vacancy = {
  ...mockVacancy,
  id: '2',
  name: 'Junior Frontend Developer',
  salary: null,
  schedule: {
    id: 'fullDay',
    name: 'Полный день',
  },
};

export const mockVacancies: Vacancy[] = [
  mockVacancy,
  mockVacancyWithoutSalary,
  {
    ...mockVacancy,
    id: '3',
    name: 'Senior React Developer',
    salary: {
      from: 300000,
      to: null,
      currency: 'RUR',
      gross: true,
    },
    area: {
      id: '2',
      name: 'Санкт-Петербург',
      url: 'https://api.hh.ru/areas/2',
    },
    schedule: {
      id: 'flexible',
      name: 'Гибкий график',
    },
  },
];

export const mockVacanciesResponse: VacanciesResponse = {
  items: mockVacancies,
  found: 100,
  pages: 10,
  page: 0,
  per_page: 10,
  clusters: null,
  arguments: null,
  fixes: null,
  suggests: null,
  alternate_url: 'https://hh.ru/search/vacancy',
};

