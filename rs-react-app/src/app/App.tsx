import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <SearchPanel />
      </div>
    </ErrorBoundary>
  );
};

export default App;
