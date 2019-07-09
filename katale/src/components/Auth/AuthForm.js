import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { CssTextField} from './overideStyles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const AuthForm = (props)=>  {
  const {
    error,
    authType,
    handleChange,
    handleSubmit,
    isValid,
    emailError,
    onClick,
    roles,
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      role

    } } = props;
  let buyer ='';
  let seller = '';

  if (roles){
    buyer = roles.find((role)=> role.name === 'buyer');
    seller = roles.find((role)=> role.name === 'seller');
  }

  return (
    <div className="auth-form">
      <div className="header">{(authType==='signup')?'Please fill in this form to create an account':'Login here'}</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="error">{ error }</div>
        <div     hidden={authType==='login'}>
          <CssTextField
            id="standard-first-name"
            label="First Name"
            margin="normal"
            fullWidth
            onChange={handleChange('firstName')}
            value={firstName}
          />
        </div>
        <div hidden={authType==='login'}>
          <CssTextField
            id="standard-last-name"
            label="Last Name"
            margin="normal"
            fullWidth
            onChange={handleChange('lastName')}
            value={lastName}
          />
        </div>
        <div >
          <CssTextField
            id="standard-email"
            label="Email"
            margin="normal"
            fullWidth
            onChange={handleChange('email')}
            value={email}
          />
        </div>
        <div className="invalid-email" hidden={authType==='login'}>
          {emailError}
        </div >
        <div  hidden={authType==='login'}>
          <CssTextField
            id="standard-phone-number"
            label="Phone Number"
            margin="normal"
            fullWidth
            onChange={handleChange('phoneNumber')}
            value={phoneNumber}
          />
        </div>
        <div hidden={authType==='login'}>
          <FormControl  fullWidth>
            <InputLabel   htmlFor="role">Register as</InputLabel>
            <Select
              value={role}
              onChange={handleChange('role')}
              inputProps={{
                name: 'role',
                id: 'role-select',
              }}
            >
              <MenuItem value={buyer.id}>Buyer</MenuItem>
              <MenuItem value={seller.id}>Seller</MenuItem>
            </Select>

          </FormControl >
        </div>
        <div>
          <CssTextField
            id="standard-password-input"
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            onChange={handleChange('password')}
            value={password}
          />
        </div >
        <div className="password-info" hidden={authType==='login'}>
            password should be a minimum of 6 characters
        </div >
        <div  hidden={authType==='login'}>
          <CssTextField
            id="standard-cpassword-input"
            label="Confirm Password"
            type="password"
            margin="normal"
            fullWidth
            onChange={handleChange('confirmPassword')}
            value={confirmPassword}
          />
        </div>
        <div className='button'>
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
      </form>
      <div className="action-links" hidden={authType==='login'}>Already have an account? <span className="link"><Link to='/login'>Login</Link></span></div>
      <div className="action-links" hidden={authType==='signup'}>New member? <span className="link"><Link to='/signup'>Create Account</Link></span></div>
      <div className="action-links" hidden={authType==='signup'}>Forgot password? <span className="reset-password" onClick={onClick}>Reset Password</span></div>
    </div>
  );
};

export default AuthForm;
