import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';

class Layout extends Component {

  render(){
    const { pathname } = this.props.location;
    const urls = ['/login', '/signup'];

    return (
      <div className="layout">
        <div className="grid-wrapper">
          <div className="nav">
            {!urls.includes(pathname) &&  <NavBar />}
          </div>
          <div className="content">
            {this.props.children}
          </div>
        </div>
        <div className="footer">
          {!urls.includes(pathname) && <Footer/> }
        </div>
      </div>
    );
  }}

export default withRouter(Layout);
