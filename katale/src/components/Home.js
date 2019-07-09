import React, { Component } from 'react';

import { connect } from 'react-redux';

class Home extends Component {

  render() {

    return (
      <React.Fragment>

        <div>
          <span name="3" >This Home page</span>
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
