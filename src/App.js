import React, { Component } from 'react';
import ComponentA from './components/ComponentA';
import './App.scss';

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <div className="App">
          <ComponentA />
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
