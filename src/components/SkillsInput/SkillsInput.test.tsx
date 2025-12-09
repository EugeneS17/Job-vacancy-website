import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { SkillsInput } from './SkillsInput';

describe('SkillsInput', () => {
  const defaultProps = {
    skills: ['TypeScript', 'React', 'Redux'],
    onAddSkill: vi.fn(),
    onRemoveSkill: vi.fn(),
  };

  it('renders existing skills as pills', () => {
    render(<SkillsInput {...defaultProps} />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
  });

  it('adds skill on Enter key press', async () => {
    const onAddSkill = vi.fn();
    render(<SkillsInput {...defaultProps} onAddSkill={onAddSkill} />);

    const input = screen.getByPlaceholderText('Навык');
    await userEvent.type(input, 'JavaScript{Enter}');

    expect(onAddSkill).toHaveBeenCalledWith('JavaScript');
  });

  it('removes skill on pill remove click', async () => {
    const onRemoveSkill = vi.fn();
    const { container } = render(<SkillsInput {...defaultProps} onRemoveSkill={onRemoveSkill} />);

    const removeButtons = container.querySelectorAll('.mantine-Pill-remove');
    await userEvent.click(removeButtons[0]);

    expect(onRemoveSkill).toHaveBeenCalledWith('TypeScript');
  });
});
