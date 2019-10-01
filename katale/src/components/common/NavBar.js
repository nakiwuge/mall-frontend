import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Restricted from '../Protected/Restricted';
import { authService } from '../../utils/authentication';

class NavBar extends Component {
  state={
    hideLogin:false,
    showCategoryMenu: false
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
  handleHover=()=>{
    this.setState({
      showCategoryMenu: true
    });
  }
  handleMouseLeave=()=>{
    this.setState({
      showCategoryMenu: false
    });
  }

  render() {
    const {hideLogin, showCategoryMenu} = this.state;

    return (
      <React.Fragment>
        <div className="navbar">
          <div className="nav-head">
            <div className="logo">Katale</div>
            <ul>
              <div className="nav-center">
                <li><Link to="/">Home</Link></li>
                <li >
                  <Restricted roles={['admin', 'superAdmin']}>
                    <div onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave} >
                      <div className="categories">Categories</div>
                      {showCategoryMenu
                      &&<div className="dropdown">
                        <div ><Link to="/store-categories">Store Categories</Link></div>
                        <div ><Link to="/item-categories">Item Categories</Link></div>
                      </div>}
                    </div>
                  </Restricted>
                </li>
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
export default NavBar;
