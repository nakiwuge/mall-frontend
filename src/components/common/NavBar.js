/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import Restricted from '../Protected/Restricted';
import { authService } from '../../utils/authentication';

class NavBar extends Component {
  state = {
    isLoggedIn: false,
    showCategoryMenu: false,
    isActive:false
  }

  async componentWillMount() {
    const isAuthenticated = await authService.isAuthenticated();
    if (isAuthenticated) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  logout = () => {
    authService.logoutUser();
    this.setState({
      isLoggedIn: false
    });
  }
  handleHover = () => {
    this.setState({
      showCategoryMenu: true
    });
  }
  handleMouseLeave = () => {
    this.setState({
      showCategoryMenu: false
    });
  }
  handleActive = (url) =>{
    if (this.props.location.pathname === url){

      return true;
    }

    return false;
  }

  render() {
    const { isLoggedIn, showCategoryMenu } = this.state;
    const {location:{pathname}}= this.props;

    return (
      <React.Fragment>
        <div className="navbar">
          <div className="nav-head">
            <div className="logo">
              Katale
            </div>
            <hr />
          </div>
          <ul>
            <li  className={`${(this.handleActive('/') || pathname.includes('items')) ?'isActive':''}`}><Link to="/">Home</Link></li>

            <li className={`${pathname.includes('categories')?'sub-menu isActive':'sub-menu'}`} onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}  >

              <Restricted roles={['admin', 'superAdmin']}>
                <a>Categories</a><span className="arrow">></span>
                {showCategoryMenu
                  && <div className="dropdown">
                    <div ><Link to="/categories/store-categories">Store Categories</Link></div>
                    <div ><Link to="/categories/item-categories">Item Categories</Link></div>
                  </div>}
              </Restricted>
            </li>
            <li className={`${pathname.includes('/stores')?'isActive':''}`}><div><Link to="/stores">Stores</Link></div></li>
            <li><Link to="/about">About</Link></li>
            <hr />
            <li className={`${isLoggedIn ? 'hide' : ''}`}><Link to="/signup">Sign up</Link></li>
            <li className={`${isLoggedIn ? 'hide' : ''}`}><Link to="/login">Login</Link></li>
            <li className={`${!isLoggedIn ? 'hide' : ''}`}><Link to="/profile">Profile</Link></li>
            <li className={`${!isLoggedIn ? 'hide' : ''}`} onClick={this.logout}><a>Log out</a></li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(NavBar);
