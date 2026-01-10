export interface Salary {
  from: number | null;
  to: number | null;
  currency: string;
  gross: boolean;
}

export interface Area {
  id: string;
  name: string;
  url: string;
}

export interface Employer {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls?: {
    '90': string;
    '240': string;
    original: string;
  };
  vacancies_url: string;
  accredited_it_employer: boolean;
  trusted: boolean;
}

export interface Experience {
  id: string;
  name: string;
}

export interface Employment {
  id: string;
  name: string;
}

export interface Schedule {
  id: string;
  name: string;
}

export interface KeySkill {
  name: string;
}

export interface Vacancy {
  id: string;
  name: string;
  area: Area;
  salary: Salary | null;
  employer: Employer;
  published_at: string;
  created_at: string;
  archived: boolean;
  apply_alternate_url: string;
  alternate_url: string;
  url: string;
  experience: Experience;
  employment: Employment;
  schedule: Schedule;
  key_skills?: KeySkill[];
  description?: string;
  snippet?: {
    requirement: string | null;
    responsibility: string | null;
  };
}

export interface VacanciesResponse {
  items: Vacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
  clusters: unknown;
  arguments: unknown;
  fixes: unknown;
  suggests: unknown;
  alternate_url: string;
}

export interface VacancyFilters {
  text: string;
  area: string;
  skillSet: string[];
  page: number;
}

export type WorkFormat = 'remote' | 'office' | 'hybrid';

export const AREAS = {
  ALL: '',
  MOSCOW: '1',
  SAINT_PETERSBURG: '2',
} as const;

export const AREA_LABELS: Record<string, string> = {
  '': 'Все',
  '1': 'Москва',
  '2': 'Санкт-Петербург',
};

