import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

  render() {

    return (
      <React.Fragment>
        <section>
          <div className="home">
           This Home page
            <div className="btn-add-store">
              <button>Add Store</button>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
