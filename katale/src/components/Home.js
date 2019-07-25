import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stores from './Stores/Stores';
import AddStore from './Stores/AddStore';
import Restricted from './Protected/Restricted';

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
        <section>
          <div className="home">
            <div className="header">
              <span>Stores</span>
              <Restricted roles={['admin', 'superAdmin','seller']}>
                <button onClick={this.onClick}>Add Store</button>
              </Restricted>
            </div>
            <div >
              <Stores/>
            </div>
            <div>
              <AddStore
                open={this.state.open}
                handleClose={this.handleClose}
              />
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
