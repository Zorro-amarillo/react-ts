import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithRouter = (component: ReactElement) => {
  return render(<Router>{component}</Router>);
};

const mockedFetch = vi.fn();

export { mockedFetch, renderWithRouter };
