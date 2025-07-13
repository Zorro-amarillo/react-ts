import './App.css';
import { Component } from 'react';
import SearchPanel from './components/SearchPanel/SearchPanel';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SearchPanel />
      </div>
    );
  }
}

export default App;
