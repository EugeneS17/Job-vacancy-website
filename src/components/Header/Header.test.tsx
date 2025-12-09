import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { Header } from './Header';

describe('Header', () => {
  it('renders logo and navigation links', () => {
    render(<Header />);
    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });
});
