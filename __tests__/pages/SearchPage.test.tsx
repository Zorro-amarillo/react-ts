import { screen, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../src/shared/store';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { PokemonDetails } from '../../src/components';
import { SearchPage } from '../../src/pages';
import { renderWithRouter } from '../test-utils/test-utils';

describe('SearchPage', () => {
  it('should render SearchPanel and Footer', () => {
    renderWithRouter(<SearchPage />);

    const searchPage = screen.getByTestId('search-page');
    expect(searchPage).toBeInTheDocument();
    expect(searchPage).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('search-panel')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render Outlet when pokemonName is present', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1/bulbasaur']}>
          <Routes>
            <Route path="/:page" element={<SearchPage />}>
              <Route path=":pokemonName" element={<PokemonDetails />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('outlet-wrapper')).toBeInTheDocument();
    });
    const closeButton = await screen.findByRole('link', { name: /close card/i });
    expect(closeButton).toBeInTheDocument();
    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Bulbasaur',
    });
    expect(heading).toBeInTheDocument();
  });
});
