import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './common/NavBar';
import Home from './Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Verify from './Auth/Verify';
import ResetPassword from './Auth/ResetPassword';

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

class App extends Component {
  
  componentDidMount(){
    this.displayNavBar();
  }

  displayNavBar = ()=>{
    const { pathname } = this.props.location;
    const urls = ['/login', '/signup'];
    return urls.includes(pathname)  ? null : <NavBar />;
  }

  render() {

    return (
      <Router>
        {this.displayNavBar()}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/verify/:token" component={Verify} />
          <Route exact path="/reset-password/:token" component={ResetPassword} />
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
