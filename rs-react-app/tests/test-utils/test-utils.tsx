import { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import usePokemonService from '../../src/app/services/usePokemonService/usePokemonService';
import { renderHook } from '@testing-library/react';

const { result } = renderHook(() => usePokemonService());
const hookResult = result.current;

const renderWithRouter = (component: ReactElement) => {
  return render(<Router>{component}</Router>);
};

const mockedFetch = vi.fn();

export { hookResult, renderWithRouter, mockedFetch };
