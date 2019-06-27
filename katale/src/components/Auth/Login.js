import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import backgroundImage from '../../Assets/images/shopping-bag.png';
import { loginUser } from '../../Actions/UserAction';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

class Login extends Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
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
    this.props.loginUser(data).then(()=>{
      this.setState({
        isLoading: false
      });
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
            />
          </div>
        </div>
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
