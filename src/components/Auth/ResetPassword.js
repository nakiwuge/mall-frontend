import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../Actions/UserAction';
import Spinner from '../common/Spinner';
import { CssTextField } from './overideStyles';
import Button from '@material-ui/core/Button';

class ResetPassword extends Component {
  state = {
    isLoading:false,
    confirmPassword: '',
    password: '',
    isValid: false,
    error:null
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.user){
      return this.props.history.push('/login');
    }
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    const { match: { params } } = this.props;

    this.setState({isLoading:true});
    const data = {
      token: params.token,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.resetPassword(data).then(()=>{
      this.setState({isLoading:false});
    });
  }

  handleChange =  name =>  (event)=>{
    const { value } = event.target;

    this.setState({[name]:value}, ()=>{
      if(name==='password'){
        return this.validatePassword();
      }
      if(name==='confirmPassword'){
        return this.validateConfirmPassword();
      }
    });
  }

  validatePassword=()=>{
    const {password} = this.state;
    if(password.trim().length<6){
      return this.setState({
        isValid:false,
        error:{
          password: 'Password should have minimum of 6 characters'
        }
      });
    }

    this.setState({
      error:null
    });

  }
  validateConfirmPassword=()=>{
    const {password,confirmPassword} = this.state;
    if(confirmPassword !== password){
      return this.setState({
        isValid:false,
        error:{
          confirmPassword: 'Password do not match'
        }
      });
    }

    this.setState({
      isValid:true,
      error:null
    });

  }

  render() {
    const { isValid, error, isLoading }= this.state;

    return (
      <div className="reset-password">
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="heading">Please fill in the form to reset password</div>
          <div className="error" >
            {this.props.error}
          </div>
          <div className="fields">
            <div>
              <CssTextField
                id="standard-password-input"
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                onChange={this.handleChange('password')}
              />
            </div >
            <div className="field-error" >
              {error?error.password:''}
            </div >
            <div  >
              <CssTextField
                id="standard-cpassword-input"
                label="Confirm Password"
                type="password"
                margin="normal"
                fullWidth
                onChange={this.handleChange('confirmPassword')}
              />
            </div>
            <div className="field-error" >
              {error?error.confirmPassword:''}
            </div >
          </div>
          <div className='button' hidden={isLoading}>
            <Button
              variant="contained"
              style={{
                borderRadius: 5,
                backgroundColor: isValid?'#d32f2f': '#F5F5F5',
                padding: '10px 20px',
                fontSize: '18px',
                color: isValid?'white': 'grey',
              }}
              type="submit"
              disabled={!isValid}
            >
               Submit
            </Button>
          </div>
          <div hidden={!isLoading}>
            <Spinner/>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  error: state.userReducer.error,
});

const mapDispatchToProps = {
  resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
