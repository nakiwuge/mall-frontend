import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="footer">
          <div>
            <i className="material-icons">
              copyright
            </i>
            <span>Katale 2019</span>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
