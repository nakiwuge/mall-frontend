import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import backgroundImage from '../../Assets/images/shopping-bag.png';
import { loginUser } from '../../Actions/UserAction';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import ForgotPasswordModal from './ForgotPasswordModal';

class Login extends Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
    open:false,
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user  ){
      return this.props.history.push('/');
    }
  }

  handleChange =  name =>  (event)=>{
    const { value } = event.target;

    this.setState({[name]:value});
  }

  handleSubmit= async (e)=>{
    e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };

    this.setState({ isLoading: true });
    await this.props.loginUser(data);
    this.setState({ isLoading: false });
  }

  handleClose=()=>{
    this.setState({
      open:false
    });
  }
  onClick=()=>{
    this.setState({
      open:true
    });
  }

  render() {
    if(this.props.user){
      if(this.props.user.token){
        return <Redirect to='/'/>;
      }
    }

    const{
      email,
      password,
      isLoading,
      open
    } = this.state;

    return (
      <React.Fragment>
        <div className="login">
          <div hidden = {!isLoading}> <LinearProgress color="secondary" /></div>
          <div className="login-body">
            <img src={backgroundImage}/>
            <AuthForm
              authType="login"
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              data={{email,password}}
              error={this.props.error}
              isValid={true}
              onClick={this.onClick}
            />
          </div>
        </div>
        <ForgotPasswordModal
          open={open}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  error: state.userReducer.error,
});

const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
