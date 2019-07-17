import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Verify from './Auth/Verify';
import ResetPassword from './Auth/ResetPassword';
import StoreCategories from './Stores/StoreCategories';
import Layout from './common/Layout';
import ProtectedRoute from './Protected/protectedRoute';

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

class App extends Component {

  render() {

    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/verify/:token" component={Verify} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <ProtectedRoute exact path="/store-categories" component={StoreCategories} role={['admin', 'superAdmin']}/>
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
App.propTypes = {
  location: PropTypes.object
};

export default withRouter(App);
