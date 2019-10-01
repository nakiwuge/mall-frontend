import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getOneStore, } from '../../../Actions/store';
import { getItemCategories } from '../../../Actions/itemCategory';
import { addItem } from '../../../Actions/item';
import usePrevious from '../../Hooks/usePrevious';
import { useHandleChange, useHandleSubmit } from '../../Hooks/item';
import ItemModal from './ItemModal';

const  AddItem =(props)=>{
  const {param,addItem,open, handleClose, item, categories}=props;
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
    }
  });
  const itemId = item.id&&item.id;
  const prevProps = usePrevious(itemId);
  const [error, setError] = useState(null);
  const [handleChange,resetState]= useHandleChange(data,setData,setError,setError);
  const submitData = {
    data,
    setError,
    resetState,
    setLoading,
    param,
    func: addItem,
  };

  const  [handleSubmit] = useHandleSubmit(submitData,null,null,null);

  useEffect(() => {
    props.getItemCategories();

  }, [props.categories]);

  useEffect(()=>{
    if(prevProps!=item.id)
      handleClose();
  },[props.item.id]);

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
      />
    </div>
  );
};

const mapStateToProps = ({itemReducer,itemCategoryReducer}) => ({
  item: itemReducer.item,
  error: itemReducer.error,
  categories: itemCategoryReducer.itemCategories
});

const mapDispatchToProps = {
  getItemCategories,
  addItem,
  getOneStore
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
