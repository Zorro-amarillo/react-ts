import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page404 from './pages/Page404';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <SearchPanel />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
