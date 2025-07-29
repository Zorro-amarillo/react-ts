import { screen, render } from '@testing-library/react';
import App from '../src/app/App';

describe('App', () => {
  it('should render App with no errors', () => {
    const { container } = render(<App />);

    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/Pokemon Search Results/i)).toBeInTheDocument();
  });
});
