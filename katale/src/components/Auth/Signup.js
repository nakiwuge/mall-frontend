import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import backgroundImage from '../../Assets/images/shopping-bag.png';
import { addUser } from '../../Actions/UserAction';
import LinearProgress from '@material-ui/core/LinearProgress';
import ModalContainer from '../common/modal';
import Typography from '@material-ui/core/Typography';

class Signup extends Component {
  state = {
    isLoading:false,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isValid: false,
    emailError:null,
    open: false,
  }

  handleChange =  name =>  (event)=>{
    const{
      firstName,
      email,
      lastName,
      password,
      phoneNumber,
      confirmPassword,
    } = this.state;

    const { value } = event.target;

    this.setState({[name]:value}, async () =>{
      const data = {
        firstName,
        email,
        lastName,
        password,
        phoneNumber,
        confirmPassword,
      };

      const valid = await this.validate(data);
      const  validEmail= await this.validateEmail(email);

      if (name==='email'){
        if(!validEmail){
          this.setState({
            emailError: 'Invalid email'
          });
        }else{
          this.setState({
            emailError: null
          });
        }
      }

      if (valid.length<1 && !this.state.emailError){
        this.setState({
          isValid: true
        });
      }
    });
  }

  handleSubmit= async (e)=>{
    e.preventDefault();
    const{
      firstName,
      email,
      lastName,
      password,
      confirmPassword,
      phoneNumber,
    } = this.state;
    const data = {
      firstName,
      email,
      lastName,
      password,
      confirmPassword,
      phoneNumber
    };

    this.setState({
      isLoading: true
    });

    this.props.addUser(data).then(()=>{
      this.setState({
        isLoading: false,
      });

      if(this.props.user){
        this.setState({
          open: true,
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
      }
    });
  }

  validateEmail=(email)=>{
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return re.test(String(email).toLowerCase());
  }

  validate = async (data)=>{
    let emptyFields=[];

    await Object.keys(data).map(key =>{
      if (data[key].trim().length<1){
        emptyFields.push(data[key]);
      }
    });

    return emptyFields;
  }

  handleClose=()=>{
    this.setState({
      open:false
    });
  }

  renderContent =()=>{
    return(
      <div >
        <Typography variant="h4" id="modal-title" color="primary">
           Thank you for joining katale
        </Typography>
        <Typography variant="h6" id="simple-modal-description" >
           Just one more step !
        </Typography>
        <Typography variant="body1"  id="simple-modal-text" >
          Please check your email to verify your account.
        </Typography>
      </div>
    );
  }

  render() {
    const{
      firstName,
      email,
      lastName,
      password,
      confirmPassword,
      phoneNumber,
      isLoading,
      isValid,
      emailError,
      open
    } = this.state;

    return (
      <React.Fragment>
        <div className="signup"  >
          <div hidden = {!isLoading}> <LinearProgress color="secondary" /></div>
          <div className="signup-body"  >
            <img src={backgroundImage}/>
            <AuthForm
              authType="signup"
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              data={
                {
                  firstName,
                  email,
                  lastName,
                  password,
                  confirmPassword,
                  phoneNumber}
              }
              isValid={isValid}
              error={this.props.error}
              emailError={emailError}
            />
          </div>
          <ModalContainer
            open={open}
            handleClose={this.handleClose}
            renderContent = {this.renderContent}
          />
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
  addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
