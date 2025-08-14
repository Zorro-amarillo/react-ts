import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ErrorBoundary, Footer, PokemonDetails, SearchPanel } from '@components';
import { AboutPage, Page404, SearchPage } from '@pages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <SearchPanel />
              <Footer />
            </ErrorBoundary>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/:page" element={<SearchPage />}>
          <Route path=":pokemonName" element={<PokemonDetails />} />
        </Route>
        <Route path="/page404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
