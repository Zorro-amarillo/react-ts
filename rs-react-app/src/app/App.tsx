import './App.css';
import { Component } from 'react';
import SearchPanel from './components/SearchPanel/SearchPanel';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <SearchPanel />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
