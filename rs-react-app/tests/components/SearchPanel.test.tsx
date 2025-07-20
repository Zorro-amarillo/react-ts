import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchPanel from '../../src/app/components/SearchPanel/SearchPanel';

describe('SearchPanel', () => {
  it('should render SearchPanel with Pokemon input', () => {
    render(<SearchPanel />);

    expect(screen.getByPlaceholderText(/enter/i)).toBeInTheDocument();
  });

  it('should render SearchPanel with search Pokemon button', () => {
    render(<SearchPanel />);

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should render SearchPanel with saved search term from localStorage on mount', () => {
    localStorage.setItem('lastPokemonSearch', 'pikachu');
    render(<SearchPanel />);

    const input = screen.getByPlaceholderText('Enter Full Name or Id');

    if (input instanceof HTMLInputElement) {
      expect(input.value).toBe('pikachu');
    }
  });

  it('should show SearchPanel empty input, when no saved term in localStorage exists', () => {
    localStorage.removeItem('lastPokemonSearch');
    render(<SearchPanel />);

    const input = screen.getByPlaceholderText('Enter Full Name or Id');

    if (input instanceof HTMLInputElement) {
      expect(input.value).toBe('');
    }
  });

  it('should update Pokemon input value on change', async () => {
    render(<SearchPanel />);

    const input = screen.getByPlaceholderText('Enter Full Name or Id');

    if (input instanceof HTMLInputElement) {
      await userEvent.type(input, 'ditto');
      expect(input.value).toBe('ditto');
    }
  });
});
