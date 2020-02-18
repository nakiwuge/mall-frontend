import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { verifyUser } from '../../Actions/UserAction';
import Spinner from '../common/Spinner';

class Verify extends Component {
  state = {
    isLoading:false
  }

  handleClick=()=>{
    const { match: { params } } = this.props;
    this.setState({isLoading:true});
    this.props.verifyUser(params.token).then(()=>{
      this.setState({isLoading:false});
    });
  }

  render() {
    if(this.props.user){
      return <Redirect to='/login'/>;
    }
    return (
      <div className="verify">
        {this.state.isLoading
          ?<div className="spinner"><Spinner /></div>
          : <div>
            <div className="error">{this.props.error}</div>
            <div className="verify-body">

              <div className="text">Email verification was sucessfully</div>
              <div className="link">Click <button onClick={this.handleClick}>here</button> to login</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.verifiedUser,
  error: state.userReducer.error,
});

const mapDispatchToProps = {
  verifyUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
