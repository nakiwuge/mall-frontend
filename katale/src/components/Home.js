import React, { Component } from 'react';

import { connect } from 'react-redux';

class Home extends Component {
  state = {
    isLoading:true
  }

  render() {

    return (
      <React.Fragment>

        <div>
               This Home page
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
