import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Home from './components/home/Home';
import Header from './components/common/Header';
import RegisterForm from './components/user/RegisterForm';
import Logout from './components/user/Logout';
import LoginForm from './components/user/LoginForm';

class App extends Component {
  constructor(props){
    super(props);

    this.state = { isLoggedIn: false };
    
    this.loggedInChecker = this.loggedInChecker.bind(this);
  }

  componentDidMount() {
    this.loggedInChecker();
  }

  loggedInChecker() {
    if (sessionStorage.authtoken) {
      this.setState({ isLoggedIn: true });
    }
    else if (!sessionStorage.authtoken) {
      this.setState({ isLoggedIn: false });
    }
  }

  render() {
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn} />
        <Route path='/' exact component={Home}/>
        <Route path='/register' exact render={(props) => <RegisterForm {...props} handleLoginProp={this.loggedInChecker} />} />
        <Route path='/login' exact render={(props) => <LoginForm {...props} handleLoginProp={this.loggedInChecker} />} />
        <Route path='/logout' render={(props) => <Logout {...props} handleLogoutProp={this.loggedInChecker} />} />
      </div>
    );
  }
}

export default App;
