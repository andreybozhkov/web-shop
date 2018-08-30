import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Home from './components/home/Home';
import Header from './components/common/Header';

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
