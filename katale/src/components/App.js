import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './common/NavBar';
import Home from './Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Verify from './Auth/Verify';

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

class App extends Component {

  render() {
    const { pathname } = this.props.location;
    const verifyUrl=pathname.split('/');
    const urls = ['/login', '/signup', '/verify'];
    const displayNavBar = urls.includes(pathname) || verifyUrl.includes('verify') ? null : <NavBar />;

    return (
      <Router>
        {displayNavBar}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/verify/:token" component={Verify} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
App.propTypes = {
  location: PropTypes.object
};

export default withRouter(App);
