import { render, renderHook } from '@testing-library/react';
import type { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import usePokemonApi from '../../src/shared/api/usePokemonApi';

const { result } = renderHook(() => usePokemonApi());
const hookResult = result.current;

const renderWithRouter = (component: ReactElement) => {
  return render(<Router>{component}</Router>);
};

const mockedFetch = vi.fn();

export { hookResult, mockedFetch, renderWithRouter };
