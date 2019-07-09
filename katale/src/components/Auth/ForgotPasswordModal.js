import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalContainer from '../common/modal';
import Typography from '@material-ui/core/Typography';
import { CssTextField } from './overideStyles';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { sendForgotPasswordEmail } from '../../Actions/UserAction';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#b71c1c'},
    secondary:{main:'#298FBE'},
    error: { main:'#f44336' }
  },
});

class ForgotPasswordModal extends Component {
  state = {
    isLoading:false,
    email: '',
  }
  handleChange=(e)=>{
    this.setState({
      email:e.target.value
    });
  }

  validateEmail=(email)=>{
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return re.test(String(email).toLowerCase());
  }

  handleSubmit=()=>{
    const {email} =this.state;
    const isValid = this.validateEmail(email);

    if(!isValid ){
      this.setState({
        error: 'Please add a valid email'
      });
      return;
    }
    this.setState({
      isLoading: true
    });
    this.props.sendForgotPasswordEmail(email).then(()=>{
      this.setState({
        isLoading: false
      });
      if (this.props.error){
        return this.setState({
          error: this.props.error
        });
      }
    });

  }

  renderContent=()=>{

    return(
      <div >
        <div hidden={this.props.user }>
          <Typography variant="h4" id="modal-title" color="primary" >
               Reset Password
          </Typography>

          <Typography variant="subtitle1" id="simple-modal-description" >
               Please provide your email to reset your password
          </Typography>
          <Typography variant="subtitle2" id="simple-modal-description" color="error" >
            <div className="error">{this.state.error}</div>
          </Typography>
          <CssTextField
            id="standard-email"
            label="Email"
            margin="normal"
            fullWidth
            onChange={this.handleChange}

          />
          <div    hidden = {this.state.isLoading}>
            <Button

              onClick={this.handleSubmit}
              variant="contained"
              style={{
                borderRadius: 5,
                backgroundColor: '#d32f2f',
                padding: '10px 20px',
                fontSize: '18px',
                color: 'white',
              }}
              type="submit"
            >
        Submit
            </Button>

          </div>

        </div>
        <div hidden={!this.props.user}>
          <Typography variant="h5" id="modal-title" color="primary" >
               The Email has been sent
          </Typography>
          <Typography variant="body1" id="simple-modal-description"  color="secondary">
               Please check your email and click on the link provided.
          </Typography>
        </div>

      </div>
    );
  }

  render() {

    return (

      <div className="forgot-password-modal">
        <ThemeProvider theme={theme}>
          <ModalContainer
            open={this.props.open}
            handleClose={this.props.handleClose}
            renderContent = {this.renderContent}
            isLoading={this.state.isLoading}
          />
        </ThemeProvider>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.emailSent,
  error: state.userReducer.error,

});

const mapDispatchToProps = {
  sendForgotPasswordEmail

};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModal);
