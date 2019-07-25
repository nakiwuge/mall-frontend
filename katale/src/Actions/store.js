import axios from 'axios';
import {
  GET_STORES_SUCCESS,
  GET_STORES_FAILURE,
  ADD_STORE_SUCCESS,
  ADD_STORE_FAILURE,
  GET_ONE_STORE_SUCCESS,
  GET_ONE_STORE_FAILURE,
  EDIT_STORE_SUCCESS,
  EDIT_STORE_FAILURE,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAILURE
} from './types';
import { config } from '../utils/headers';

const storeType = (type, payload)=> ({
  type,
  payload,
});

export const getStores = ()=> async dispatch=>{

  const requestBody = {
    query: `
    {
        stores{
          id
          name
          createdAt
          category{
              id
              name
          }
          description
          imageUrl
           owner{
             id
             email
             firstName
           }
       }

     } `
  };

  return axios.post('', requestBody).then((response)=>{
    const {errors, data} = response.data;

    if (errors){
      const error = errors[0].message;

      return dispatch(storeType(GET_STORES_FAILURE, error));
    }

    dispatch(storeType( GET_STORES_SUCCESS, data.stores));
  }).catch(() =>{
    return dispatch(storeType(GET_STORES_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const getOneStore = (id)=> async dispatch=>{

  const requestBody = {
    query: `
    {
        store(id:"${id}"){
          id
          name
          createdAt
          category{
              id
              name
          }
          description
          imageUrl
           owner{
             id
             email
             firstName
             lastName
             phoneNumber
           }
       }
     } `
  };

  return axios.post('', requestBody).then((response)=>{
    const {errors, data} = response.data;
    if (errors){
      const error = errors[0].message;

      return dispatch(storeType(GET_ONE_STORE_FAILURE, error));
    }

    dispatch(storeType(GET_ONE_STORE_SUCCESS, data.store));
  }).catch(() =>{
    return dispatch(storeType(GET_ONE_STORE_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const addStore = (data)=>async dispatch=>{
  const {selectedFile,name,category,description} = data;
  const headers = await config();
  let imageUrl=null;

  if(selectedFile){
    const formData = new FormData();
    formData.append('imageUrl',selectedFile);
    const file = await  axios.post('/upload', formData, headers );
    imageUrl = file.data?file.data.data:null;
  }

  const requestBody = {
    query: `
mutation{
addStore(name:"${name}",category:"${category}",imageUrl:"${imageUrl}",description:"${description}"){
    id
    name
 }
}`
  };

  return axios.post('', requestBody, headers ).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(storeType(ADD_STORE_FAILURE, error));
    }

    dispatch(storeType(ADD_STORE_SUCCESS, response.data.data.addStore));
  }).catch(() =>{

    return dispatch(storeType(ADD_STORE_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const editStore = (data)=>async dispatch=>{
  const {id,selectedFile,name,category,description,imageUrl} = data;
  const headers = await config();
  let newImageUrl=imageUrl;

  if(selectedFile){
    const formData = new FormData();
    formData.append('imageUrl',selectedFile);
    const file = await  axios.post('/upload', formData, headers );
    newImageUrl = file.data?file.data.data:null;
  }

  const requestBody = {
    query: `
mutation{
updateStore(
  id:"${id}",
  name:"${name}",
  category:"${category}",
  imageUrl:"${newImageUrl}",
  description:"${description}"){
    id
    name
    imageUrl
    description
 }
}`
  };

  return axios.post('', requestBody, headers ).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(storeType(EDIT_STORE_FAILURE, error));
    }

    dispatch(storeType(EDIT_STORE_SUCCESS, response.data.data.updateStore));
  }).catch(() =>{

    return dispatch(storeType(EDIT_STORE_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const deleteStore = id => async dispatch=>{
  const headers = await config();

  const requestBody = {
    query: `
mutation{
deleteStore(id:"${id}"){
    id
    name
 }
}`
  };

  return axios.post('', requestBody, headers ).then( (response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(storeType(DELETE_STORE_FAILURE, error));
    }

    dispatch(storeType(DELETE_STORE_SUCCESS, response.data.data.deleteStore));
  }).catch(() =>{

    return dispatch(storeType(DELETE_STORE_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

const storeInitialState = {
  stores:null,
  store:null,
  error:null,
  deletedStore:null
};

const storeReducer = (state = storeInitialState, action) => {

  switch(action.type){
  case GET_STORES_SUCCESS:
    return {...state, stores: action.payload.reverse()};
  case GET_STORES_FAILURE:
    return {...state, error: action.payload};
  case ADD_STORE_SUCCESS:
    return {...state, store: action.payload, };
  case ADD_STORE_FAILURE:
    return {...state, error: action.payload};
  case GET_ONE_STORE_SUCCESS:
    return {...state, store: action.payload};
  case GET_ONE_STORE_FAILURE:
    return {...state, error: action.payload};
  case EDIT_STORE_SUCCESS:
    return {...state, store: action.payload, };
  case EDIT_STORE_FAILURE:
    return {...state, error: action.payload};
  case DELETE_STORE_SUCCESS:
    return {...state, deletedStore: action.payload, };
  case DELETE_STORE_FAILURE:
    return {...state, error: action.payload};
  default:
    return state;
  }
};

export default storeReducer;
