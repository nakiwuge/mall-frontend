import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class NavBar extends Component {
  state ={
    redirect:false
  }

  handleRedirect= async()=>{
    await this.setState({redirect:true});

    if (this.state.redirect){
      return <Redirect to='/signup'/>;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="navbar">
          <div className="logo">Katale</div>
          <ul>
            <div className="nav-center">
              <li  >
                <Link to="/test">
              Menu
                </Link>
              </li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </div>

            <div className="nav-right">
              <li><Link to="/signup">Sign up</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </div>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
