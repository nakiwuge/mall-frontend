import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect} from 'react-router-dom';
import { authService } from '../../utils/authentication';
import { getUser } from '../../Actions/UserAction';

class ProtectedRoute extends Component {

  async componentWillMount(){
    const user = await authService.decodeToken();
    await this.props.getUser(user.userId);
  }

  render(){
    const { component: Component,currentUser, ...props} = this.props;

    if (currentUser){
      const isAuthorized = props.role.includes(currentUser.role.name);
      if(!isAuthorized){
        return <Redirect to='/'/>;
      }
    }

    return (
      <Route
        {...props}
        render={  props =>{
          return authService.isAuthenticated()
            ? <Component {...props} /> :authService.redirectUser();}
        }
      />
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = {
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
