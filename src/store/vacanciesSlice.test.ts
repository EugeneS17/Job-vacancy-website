import { describe, it, expect } from 'vitest';
import vacanciesReducer, {
  setSearchText,
  addSkill,
  removeSkill,
} from './vacanciesSlice';

const initialState = {
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

describe('vacanciesSlice', () => {
  it('should return the initial state', () => {
    expect(vacanciesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSearchText', () => {
    const actual = vacanciesReducer(initialState, setSearchText('frontend'));
    expect(actual.filters.text).toEqual('frontend');
  });

  it('should handle addSkill and prevent duplicates', () => {
    const state1 = vacanciesReducer(initialState, addSkill('JavaScript'));
    expect(state1.filters.skillSet).toContain('JavaScript');

    const state2 = vacanciesReducer(state1, addSkill('JavaScript'));
    expect(state2.filters.skillSet.filter((s) => s === 'JavaScript')).toHaveLength(1);
  });

  it('should handle removeSkill', () => {
    const actual = vacanciesReducer(initialState, removeSkill('Redux'));
    expect(actual.filters.skillSet).not.toContain('Redux');
  });
});
