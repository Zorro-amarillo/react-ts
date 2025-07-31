import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import SearchPanel from './components/SearchPanel/SearchPanel';
import AboutPage from './pages/AboutPage';
import Page404 from './pages/Page404';
import SearchPage from './pages/SearchPage';

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
