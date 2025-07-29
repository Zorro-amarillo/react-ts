import SearchPage from '../../src/app/pages/SearchPage';
import { renderWithRouter } from '../test-utils/test-utils';
import { screen } from '@testing-library/react';

describe('SearchPage', () => {
  it('should render SearchPanel and Footer', () => {
    renderWithRouter(<SearchPage />);

    const searchPage = screen.getByTestId('search-page');
    expect(searchPage).toBeInTheDocument();
    expect(searchPage).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('search-panel')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
