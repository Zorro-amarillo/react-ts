import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page404 from './pages/Page404';
import AboutPage from './pages/AboutPage';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import SearchPage from './pages/SearchPage';
import Footer from './components/Footer/Footer';

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
        <Route path={`/pokemons`} element={<SearchPage />}>
          <Route path={`:pokemonName`} element={<PokemonDetails />} />
        </Route>
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
