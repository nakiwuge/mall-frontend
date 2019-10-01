import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getOneStore, } from '../../../Actions/store';
import { getItemCategories } from '../../../Actions/itemCategory';
import { editItem } from '../../../Actions/item';
import usePrevious from '../../Hooks/usePrevious';
import { useHandleChange, useHandleSubmit } from '../../Hooks/item';
import ItemModal from './ItemModal';

const  EditItem =(props)=>{
  const {store,editItem,open, handleClose,updatedItem,item, categories}=props;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    name:'',
    description: '',
    selectedFile: null,
    price: '',
    category: '',
    negotiable: {
      yes: false,
      no: false
    },
    imageUrl:''
  });
  const initialItemProps= {
    name:item.name,
    description:item.description,
    selectedFile:null,
    price:item.price,
    category: item.category.id,
    negotiable: {
      yes: item.negotiable?true:false,
      no: item.negotiable?false:true
    },
  };

  const itemObj = updatedItem;
  const prevProps = usePrevious(itemObj);
  const [error, setError] = useState(null);
  const [handleChange,resetState]= useHandleChange(data,setData,setError);
  const submitData = {
    data,
    setError,
    resetState,
    setLoading,
    param:store&&store.id,
    id:item&&item.id,
    func: editItem,
  };

  const  [handleSubmit] = useHandleSubmit(submitData,initialItemProps, handleClose, item.imageUrl);

  useEffect(() => {
    props.getItemCategories();
    setData({ ...initialItemProps });
  }, [item]);

  useEffect(()=>{
    if(prevProps&&(JSON.stringify(prevProps)!=JSON.stringify(updatedItem))){

      handleClose();
    }
  },
  [updatedItem]);

  return (
    <div >
      <ItemModal
        categories={categories}
        error={error}
        handleChange={handleChange}
        data={data}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        open={open}
        handleClose={handleClose}
        action={'edit'}
        imageUrl={item.imageUrl}
      />
    </div>
  );
};

const mapStateToProps = ({itemReducer,itemCategoryReducer,storeReducer }) => ({
  item: itemReducer.item,
  updatedItem: itemReducer.updatedItem,
  error: itemReducer.error,
  categories: itemCategoryReducer.itemCategories,
  store: storeReducer.store,
});

const mapDispatchToProps = {
  getItemCategories,
  editItem,
  getOneStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
