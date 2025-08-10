import store from '../../src/shared/store';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithRouter = (component: ReactElement) => {
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

const mockedFetch = vi.fn();

export { mockedFetch, renderWithRouter };
