import axios from 'axios';
import {
  GET_ITEM_CATEGORY_SUCCESS,
  GET_ITEM_CATEGORY_FAILURE,
  ADD_ITEM_CATEGORY_SUCCESS,
  ADD_ITEM_CATEGORY_FAILURE,
  EDIT_ITEM_CATEGORY_SUCCESS,
  EDIT_ITEM_CATEGORY_FAILURE,
  DELETE_ITEM_CATEGORY_SUCCESS,
  DELETE_ITEM_CATEGORY_FAILURE
} from './types';
import { config } from '../utils/headers';

const itemCategoryType = (type, payload)=> ({
  type,
  payload,
});

export const getItemCategories = ()=> async dispatch=>{
  const headers = await config();
  const requestBody = {
    query: `
    {
        itemCategories{
           id
           name
           items{
            id
            name
           }
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

      return dispatch(itemCategoryType(GET_ITEM_CATEGORY_FAILURE, error));
    }

    dispatch(itemCategoryType(GET_ITEM_CATEGORY_SUCCESS, response.data.data.itemCategories));
  }).catch(() =>{
    return dispatch(itemCategoryType(GET_ITEM_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const addItemCategory = (name)=>async dispatch=>{
  const headers = await config();

  const requestBody = {
    query: `
    mutation{
      addItemCategory(name:"${name}"){
          id
          name
       }
     }`
  };

  return axios.post('', requestBody,  headers).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(itemCategoryType(ADD_ITEM_CATEGORY_FAILURE, error));
    }

    dispatch(itemCategoryType(ADD_ITEM_CATEGORY_SUCCESS, response.data.data.addItemCategory));
  }).catch(() =>{

    return dispatch(itemCategoryType(ADD_ITEM_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const editItemCategory = (name,id)=> async dispatch=>{
  const headers =  await config();
  const requestBody = {
    query: `
    mutation{
      updateItemCategory(id:"${id}",name:"${name}"){
          id
          name
       }
     }`
  };

  return axios.post('', requestBody, headers).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(itemCategoryType(EDIT_ITEM_CATEGORY_FAILURE, error));
    }

    dispatch(itemCategoryType(EDIT_ITEM_CATEGORY_SUCCESS, response.data.data.updateItemCategory));
  }).catch(() =>{
    return dispatch(itemCategoryType(EDIT_ITEM_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const deleteItemCategory = (id)=> async dispatch=>{
  const headers =  await config();
  const requestBody = {
    query: `
    mutation{
      deleteItemCategory(id:"${id}"){
          id
          name
       }
     }`
  };

  return axios.post('', requestBody, headers).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(itemCategoryType(DELETE_ITEM_CATEGORY_FAILURE, error));
    }

    dispatch(itemCategoryType(DELETE_ITEM_CATEGORY_SUCCESS, response.data.data.deleteItemCategory));
  }).catch(() =>{
    return dispatch(itemCategoryType(DELETE_ITEM_CATEGORY_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

const InitialState = {
  itemCategories:null,
  itemCategory:null,
  error:null,
  updatedCategory:null,
  deletedCategory:{}
};

const itemCategoryReducer = (state = InitialState, action) => {

  switch(action.type){
  case GET_ITEM_CATEGORY_SUCCESS:
    return {...state, itemCategories: action.payload.reverse()};
  case GET_ITEM_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  case ADD_ITEM_CATEGORY_SUCCESS:
    return {...state, itemCategory: action.payload, };
  case ADD_ITEM_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  case EDIT_ITEM_CATEGORY_SUCCESS:
    return {...state, updatedCategory: action.payload, };
  case EDIT_ITEM_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  case DELETE_ITEM_CATEGORY_SUCCESS:
    return {...state, deletedCategory: action.payload, };
  case DELETE_ITEM_CATEGORY_FAILURE:
    return {...state, error: action.payload};
  default:
    return state;
  }
};

export default itemCategoryReducer;
