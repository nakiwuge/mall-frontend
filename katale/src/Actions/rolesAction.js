import axios from 'axios';
import {
  GET_ROLES_SUCCESS,
  GET_ROLES_FALIURE,
} from './types';

const roleType = (type, payload)=> ({
  type,
  payload,
});

export const getRoles = ()=>dispatch=>{

  const requestBody = {
    query: `
             {
              roles{
                  id
                  name
              }
            }  `
  };

  return axios.post('', requestBody).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(roleType(GET_ROLES_FALIURE, error));
    }

    dispatch(roleType(GET_ROLES_SUCCESS, response.data.data.roles));
  }).catch(() =>{
    return dispatch(roleType(GET_ROLES_FALIURE, 'Something went wrong. Please Try again later.'));
  });
};

const roleInitialState = {
  roles:null,
  error:null,
};

const roleReducer = (state = roleInitialState, action) => {

  switch(action.type){
  case GET_ROLES_SUCCESS:
    return {...state, roles: action.payload };
  case GET_ROLES_FALIURE:
    return {...state, error: action.payload};
  default:
    return state;
  }
};

export default roleReducer;
