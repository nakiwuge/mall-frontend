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
import ViewStore from './Stores/ViewStore';
import ItemCategories from './Stores/Items/ItemCategories';
import Stores from './Stores/Stores';
import ViewSingleItem from './Stores/Items/ViewSingleItem';

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
            <Route exact path="/stores" component={Stores} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/verify/:token" component={Verify} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <ProtectedRoute exact path="/categories/store-categories" component={StoreCategories} role={['admin', 'superAdmin']}/>
            <ProtectedRoute exact path="/categories/item-categories" component={ItemCategories} role={['admin', 'superAdmin']}/>
            <ProtectedRoute  path="/stores/:id" component={ViewStore} role={['admin', 'superAdmin','seller', 'buyer']}/>
            <ProtectedRoute  path="/items/:id" component={ViewSingleItem} role={['admin', 'superAdmin','seller', 'buyer']}/>
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
