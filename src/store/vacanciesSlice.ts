import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { VacanciesResponse, Vacancy, VacancyFilters } from '../types/vacancy';

interface VacanciesState {
  items: Vacancy[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  totalFound: number;
  filters: VacancyFilters;
}

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 0,
  totalFound: 0,
  filters: {
    text: '',
    area: '',
    skillSet: ['TypeScript', 'React', 'Redux'],
    page: 0,
  },
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.hh.ru/vacancies';
const INDUSTRY = import.meta.env.VITE_INDUSTRY_ID || '7';
const PROFESSIONAL_ROLE = import.meta.env.VITE_PROFESSIONAL_ROLE_ID || '96';
const PER_PAGE = Number(import.meta.env.VITE_PER_PAGE) || 10;

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async (filters: VacancyFilters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append('industry', INDUSTRY);
      params.append('professional_role', PROFESSIONAL_ROLE);
      params.append('per_page', String(PER_PAGE));
      params.append('page', String(filters.page));

      const searchTerms = [filters.text, ...filters.skillSet].filter(Boolean);
      if (searchTerms.length > 0) {
        params.append('text', searchTerms.join(' '));
        params.append('search_field', 'name');
        params.append('search_field', 'company_name');
        params.append('search_field', 'description');
      }

      if (filters.area) {
        params.append('area', filters.area);
      }

      const response = await axios.get<VacanciesResponse>(`${API_BASE_URL}?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла ошибка при загрузке вакансий');
    }
  }
);

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.filters.text = action.payload;
      state.filters.page = 0;
    },
    setArea: (state, action: PayloadAction<string>) => {
      state.filters.area = action.payload;
      state.filters.page = 0;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.filters.skillSet.includes(action.payload)) {
        state.filters.skillSet.push(action.payload);
        state.filters.page = 0;
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.filters.skillSet = state.filters.skillSet.filter(
        (skill) => skill !== action.payload
      );
      state.filters.page = 0;
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.filters.skillSet = action.payload;
      state.filters.page = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.pages;
        state.totalFound = action.payload.found;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchText, setArea, addSkill, removeSkill, setSkills, setPage } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;

