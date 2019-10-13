import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Stores/Items';
import Search from './common/search';

class Home extends Component {
  state = {
    open:false,
  }

  handleClose=()=>{
    this.setState({
      open:false,
    });
  }

  onClick=()=>{
    this.setState({
      open:true,
    });
  }

  render() {

    return (
      <React.Fragment>
        <div className="home">
          <header>
            <span className="title">Items</span>
            <span><Search/></span>
          </header>
          <Items/>
          <div>
          </div>
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
