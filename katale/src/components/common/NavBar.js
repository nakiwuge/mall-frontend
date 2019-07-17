import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../Actions/UserAction';
import Restricted from '../Protected/Restricted';
import { authService } from '../../utils/authentication';

class NavBar extends Component {
  state={
    hideLogin:false
  }

  async componentWillMount(){
    const isAuthenticated = await authService.isAuthenticated();
    if (isAuthenticated){
      this.setState({
        hideLogin:true
      });
    }
  }

  logout = ()=>{
    authService.logoutUser();
    this.setState({
      hideLogin:false
    });
  }

  render() {
    const {hideLogin} = this.state;

    return (
      <React.Fragment>
        <div className="navbar">
          <div className="nav-head">
            <div className="logo">Katale</div>
            <ul>
              <div className="nav-center">
                <li><Link to="/">Home</Link></li>
                <li ><Restricted roles={['admin', 'superAdmin']}><div > <Link to="/store-categories">Store Categories</Link></div></Restricted></li>
                <li><div><Link to="/">Stores</Link></div></li>
                <li><Link to="/about">About</Link></li>
              </div>
              <div className="nav-right">
                <li><div hidden={hideLogin} ><Link to="/signup">Sign up</Link></div></li>
                <li><div hidden={hideLogin}><Link to="/login">Login</Link></div></li>
                <li><div hidden={!hideLogin} onClick={this.logout}>Log out</div></li>
                <li><Link to="/profile">Profile</Link></li>
              </div>
            </ul>
          </div>
          <div className="bottom"></div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer.user,
  error: state.userReducer.error,
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = {
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
