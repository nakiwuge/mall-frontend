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
        {!urls.includes(pathname) &&  <NavBar />}
        <div className="content">
          {this.props.children}
        </div>
        {!urls.includes(pathname) && <Footer/> }
      </div>
    );
  }}

export default withRouter(Layout);
