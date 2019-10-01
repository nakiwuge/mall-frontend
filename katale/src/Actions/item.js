import axios from 'axios';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAILURE,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE
} from './types';
import { config } from '../utils/headers';

const itemType = (type, payload)=> ({
  type,
  payload,
});

export const getItems = ()=> async dispatch=>{
  const headers = await config();
  const requestBody = {
    query: `
    {
        items{
        id
        name
        imageUrl
        price
        negotiable
        description
        category{
            name
        }
       }
     } `
  };

  return axios.post('', requestBody, headers).then((response)=>{
    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(itemType(GET_ITEMS_FAILURE, error));
    }

    dispatch(itemType(GET_ITEMS_SUCCESS, response.data.data.items));
  }).catch(() =>{
    return dispatch(itemType(GET_ITEMS_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const getItem = id => async dispatch=>{
  const headers = await config();
  const requestBody = {
    query: `
    {
        item(id:"${id}"){
        id
        name
        imageUrl
        price
        negotiable
        description
        category{
            id
            name
        }
       }
     } `
  };

  return axios.post('', requestBody, headers).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(itemType(GET_ITEM_FAILURE, error));
    }

    dispatch(itemType(GET_ITEM_SUCCESS, response.data.data.item));
  }).catch(() =>{
    return dispatch(itemType(GET_ITEM_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const addItem = (data)=>async dispatch=>{
  const {selectedFile,name,category,description,price,negotiable,store} = data;
  const headers = await config();
  let imageUrl;

  if(selectedFile){
    const formData = new FormData();
    formData.append('imageUrl',selectedFile);
    const file = await  axios.post('/upload', formData, headers );
    imageUrl = file.data?file.data.data:null;
  }

  const requestBody = {
    query: `
  mutation{
  addItem(
      name:"${name}",
      category:"${category}",
      imageUrl:"${imageUrl}",
      description:"${description}",
      store:"${store}",
      price:"${price}",
      negotiable:${negotiable},
      ){
      id
      name
   }
  }`
  };

  return axios.post('', requestBody, headers ).then((response)=>{

    if (response.data.errors){
      const error = response.data.errors[0].message;

      return dispatch(itemType(ADD_ITEM_FAILURE, error));
    }

    dispatch(itemType(ADD_ITEM_SUCCESS, response.data.data.addItem));
  }).catch(() =>{

    return dispatch(itemType(ADD_ITEM_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const editItem = (data)=>async dispatch=>{
  const {id,selectedFile,name,category,description,price,negotiable,store,imageUrl} = data;
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
  updateItem(
      id:"${id}",
      name:"${name}",
      category:"${category}",
      imageUrl:"${newImageUrl}",
      description:"${description}",
      store:"${store}",
      price:"${price}",
      negotiable:${negotiable},
      ){
      id
      name
      imageUrl
      price
      negotiable
      description
      category{
          id
          name
      }
   }
  }`
  };

  return axios.post('', requestBody, headers ).then((response)=>{
    const { data,errors}=response.data;

    if (errors){
      const error = errors[0].message;

      return dispatch(itemType(EDIT_ITEM_FAILURE, error));
    }

    dispatch(itemType(EDIT_ITEM_SUCCESS, data.updateItem));
  }).catch(() =>{

    return dispatch(itemType(EDIT_ITEM_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

export const deleteItem = (id)=> async dispatch=>{
  const headers =  await config();
  const requestBody = {
    query: `
    mutation{
      deleteItem(id:"${id}"){
          id
          name
       }
     }`
  };

  return axios.post('', requestBody, headers).then((response)=>{
    const { data,errors}=response.data;

    if (errors){
      const error = errors[0].message;

      return dispatch(itemType(DELETE_ITEM_FAILURE, error));
    }

    dispatch(itemType(DELETE_ITEM_SUCCESS, data.deleteItem));
  }).catch(() =>{
    return dispatch(itemType(DELETE_ITEM_FAILURE, 'Something went wrong. Please Try again later.'));
  });
};

const InitialState = {
  items:[],
  item:{},
  updatedItem:{},
  error:null,
  deleted:{}
};

const itemReducer = (state = InitialState, action) => {
  switch(action.type){
  case GET_ITEMS_SUCCESS:
    return {...state, items: action.payload.reverse()};
  case GET_ITEMS_FAILURE:
    return {...state, error: action.payload};
  case GET_ITEM_SUCCESS:
    return {...state, item: action.payload};
  case GET_ITEM_FAILURE:
    return {...state, error: action.payload};
  case ADD_ITEM_SUCCESS:
    return {...state, item: action.payload, };
  case ADD_ITEM_FAILURE:
    return {...state, error: action.payload};
  case EDIT_ITEM_SUCCESS:
    return {...state, updatedItem: action.payload, };
  case EDIT_ITEM_FAILURE:
    return {...state, error: action.payload};
  case DELETE_ITEM_SUCCESS:
    return {...state, deleted: action.payload, };
  case DELETE_ITEM_FAILURE:
    return {...state, error: action.payload};
  default:
    return state;
  }
};

export default itemReducer;
