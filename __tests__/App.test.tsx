import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';

import App from '../src/App';
import store from '../src/shared/store';

describe('App', () => {
  it('should render App with no errors', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/Pokemon Search Results/i)).toBeInTheDocument();
  });
});
