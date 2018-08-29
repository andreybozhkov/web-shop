import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Route path='/' exact component={Home}/>
        </div>
      </div>
    );
  }
}

export default App;
