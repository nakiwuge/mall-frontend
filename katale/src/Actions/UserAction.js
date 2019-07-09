import axios from 'axios';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FALIURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
  SEND_FORGOT_PASSWORD_EMAIL_SUCCESS,
  SEND_FORGOT_PASSWORD_EMAIL_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from './types';

const authType = (type, payload)=> ({
  type,
  payload,
});
const host = window.location.origin;

export const addUser = (data)=>dispatch=>{
  const{
    firstName,
    email,
    lastName,
    password,
    confirmPassword,
    phoneNumber,
    role
  } = data;

  const requestBody = {
    query: `
            mutation {
              addUser(firstName:"${firstName}",lastName: "${lastName}",
              email: "${email}", phoneNumber: "${phoneNumber}",
              password: "${password}", confirmPassword:"${confirmPassword}", host:"${host}", role:"${role}" ){
                  firstName,
                  email,
                  lastName,
                  confirmPassword,
                  password,
                  id
                  host
                  isVerified
              }
            }
          `
  };

  return axios.post('', requestBody).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(authType(REGISTER_USER_FALIURE, error));
    }

    dispatch(authType(REGISTER_USER_SUCCESS, response.data.data.addUser));
  }).catch(() =>{
    return dispatch(authType(REGISTER_USER_FALIURE, 'Something went wrong. Please Try again later.'));
  });
};

export const loginUser = (data)=>dispatch=>{
  const{
    email,
    password,
  } = data;

  const requestBody = {
    query: `
                {
                  login(email: "${email}",password: "${password}", ){
                    token
                    user{
                        firstName
                        email
                        id

                  }}
                }
              `
  };

  return axios.post('', requestBody).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      if(error === 'Cannot read property \'isVerified\' of null'){
        return dispatch(authType(LOGIN_USER_FAILURE, 'Email does not exist'));
      }

      return dispatch(authType(LOGIN_USER_FAILURE, error));
    }
    localStorage.setItem('token',response.data.data.login.token);
    dispatch(authType(LOGIN_USER_SUCCESS, response.data.data.login));

  }).catch(() =>{
    return dispatch(authType(LOGIN_USER_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const verifyUser = (token)=>dispatch=>{

  const requestBody = {
    query: `
              mutation {
                verifyUser(token:"${token}"){
                    verifiedUser
                }
              }
            `
  };

  return axios.post('', requestBody).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      if(error==='jwt expired' ||error=== 'TokenExpiredError: jwt expired'){
        return dispatch(authType(VERIFY_USER_FAILURE, 'The verification link expired please contact support'));
      }

      return dispatch(authType(VERIFY_USER_FAILURE, 'Something went wrong. Please Try again later.'));
    }

    dispatch(authType(VERIFY_USER_SUCCESS, response.data.data.verifyUser));
  }).catch(() =>{
    return dispatch(authType(VERIFY_USER_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};
export const sendForgotPasswordEmail = (email)=>dispatch=>{

  const requestBody = {
    query: `
    {
      sendPasswordEmail(email:"${email}", host:"${host}" ){
      user
  }
}`
  };

  return axios.post('', requestBody).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(authType(SEND_FORGOT_PASSWORD_EMAIL_FAILURE, error));
    }

    dispatch(authType( SEND_FORGOT_PASSWORD_EMAIL_SUCCESS, response.data.data.sendPasswordEmail));
  }).catch(() =>{

    return dispatch(authType(SEND_FORGOT_PASSWORD_EMAIL_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const resetPassword = (data)=>dispatch=>{
  const {password, confirmPassword, token } = data;

  const requestBody = {
    query: `
    mutation {
      changePassword(password:"${password}", confirmPassword:"${confirmPassword}", token:"${token}"){
    user
  }
}
`
  };

  return axios.post('', requestBody).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      if(error==='jwt expired' ||error=== 'TokenExpiredError: jwt expired' || error=='JsonWebTokenError: invalid token'){
        return dispatch(authType(RESET_PASSWORD_FAILURE, 'The verification link expired or invalid please contact support'));
      }

      return dispatch(authType(RESET_PASSWORD_FAILURE, error));
    }

    dispatch(authType( RESET_PASSWORD_SUCCESS, response.data.data.changePassword));
  }).catch(() =>{

    return dispatch(authType(RESET_PASSWORD_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

const authInitialState ={
  user:null,
  error:null,
  verifiedUser:null,
  emailSent:null
};

const userReducer = (state = authInitialState, action) => {
  switch (action.type){
  case REGISTER_USER_SUCCESS:
    return {...state, user: action.payload, };
  case REGISTER_USER_FALIURE:
    return { ...state, error: action.payload };
  case LOGIN_USER_SUCCESS:
    return {...state, user: action.payload };
  case LOGIN_USER_FAILURE:
    return { ...state, error: action.payload };
  case VERIFY_USER_SUCCESS:
    return {...state, verifiedUser: action.payload };
  case VERIFY_USER_FAILURE:
    return { ...state, error: action.payload };
  case SEND_FORGOT_PASSWORD_EMAIL_SUCCESS:
    return {...state, emailSent: action.payload };
  case SEND_FORGOT_PASSWORD_EMAIL_FAILURE:
    return { ...state, error: action.payload };
  case RESET_PASSWORD_SUCCESS:
    return {...state, user: action.payload };
  case RESET_PASSWORD_FAILURE:
    return { ...state, error: action.payload };
  default:
    return state;
  }
};

export default userReducer;
