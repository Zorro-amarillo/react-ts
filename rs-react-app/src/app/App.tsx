import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <SearchPanel />
    </ErrorBoundary>
  );
};

export default App;
