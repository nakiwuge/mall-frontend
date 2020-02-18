import axios from 'axios';
import {
  GET_STORE_CATEGORY_SUCCESS,
  GET_STORE_CATEGORY_FAILURE,
  ADD_STORE_CATEGORY_SUCCESS,
  ADD_STORE_CATEGORY_FAILURE,
  EDIT_STORE_CATEGORY_SUCCESS,
  EDIT_STORE_CATEGORY_FAILURE,
  DELETE_STORE_CATEGORY_SUCCESS,
  DELETE_STORE_CATEGORY_FAILURE
} from './types';
import { config } from '../utils/headers';

const storeCategoryType = (type, payload)=> ({
  type,
  payload,
});

export const getStoreCategories = ()=> async dispatch=>{
  const headers = await config();
  const requestBody = {
    query: `
    {
        storeCategories{
          id
           stores{
             name
           }
          name
          createdAt
          updatedAt
           createdBy{
             id
             email
             firstName
           }
       }

     } `
  };

  return axios.post('', requestBody, headers).then((response)=>{
    
    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(storeCategoryType(GET_STORE_CATEGORY_FAILURE, error));
    }

    dispatch(storeCategoryType(GET_STORE_CATEGORY_SUCCESS, response.data.data.storeCategories));
  }).catch(() =>{
    return dispatch(storeCategoryType(GET_STORE_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const addStoreCategory = (name)=>async dispatch=>{
  const headers = await config();

  const requestBody = {
    query: `
    mutation{
      addStoreCategory(name:"${name}"){
          id
          name
       }
     }`
  };

  return axios.post('', requestBody,  headers).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(storeCategoryType(ADD_STORE_CATEGORY_FAILURE, error));
    }

    dispatch(storeCategoryType(ADD_STORE_CATEGORY_SUCCESS, response.data.data.addStoreCategory));
  }).catch(() =>{

    return dispatch(storeCategoryType(ADD_STORE_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const editStoreCategory = (name,id)=> async dispatch=>{
  const headers =  await config();
  const requestBody = {
    query: `
    mutation{
      updateStoreCategory(id:"${id}",name:"${name}"){
          id
          name
       }
     }`
  };

  return axios.post('', requestBody, headers).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(storeCategoryType(EDIT_STORE_CATEGORY_FAILURE, error));
    }

    dispatch(storeCategoryType(EDIT_STORE_CATEGORY_SUCCESS, response.data.data.updateStoreCategory));
  }).catch(() =>{
    return dispatch(storeCategoryType(EDIT_STORE_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const deleteStoreCategory = (id)=> async dispatch=>{
  const headers =  await config();
  const requestBody = {
    query: `
    mutation{
      deleteStoreCategory(id:"${id}"){
          id
          name
       }
     }`
  };

  return axios.post('', requestBody, headers).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(storeCategoryType(DELETE_STORE_CATEGORY_FAILURE, error));
    }

    dispatch(storeCategoryType(DELETE_STORE_CATEGORY_SUCCESS, response.data.data.deleteStoreCategory));
  }).catch(() =>{
    return dispatch(storeCategoryType(DELETE_STORE_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

const roleInitialState = {
  categories:null,
  category:null,
  error:null,
  updatedCategory:null,
  deletedCategory:null
};

const storeCategoryReducer = (state = roleInitialState, action) => {

  switch(action.type){
  case GET_STORE_CATEGORY_SUCCESS:
    return {...state, categories: action.payload.reverse()};
  case GET_STORE_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  case ADD_STORE_CATEGORY_SUCCESS:
    return {...state, category: action.payload, };
  case ADD_STORE_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  case EDIT_STORE_CATEGORY_SUCCESS:
    return {...state, updatedCategory: action.payload, };
  case EDIT_STORE_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  case DELETE_STORE_CATEGORY_SUCCESS:
    return {...state, deletedCategory: action.payload, };
  case DELETE_STORE_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  default:
    return state;
  }
};

export default storeCategoryReducer;
