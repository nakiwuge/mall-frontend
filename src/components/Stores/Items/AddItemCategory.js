import React from 'react';
import { connect } from 'react-redux';
import CategoryModal from '../CategoryModal';
import { addItemCategory, getItemCategories } from '../../../Actions/itemCategory';
import { useHandleSubmit, useHandleChange,useSetError, useComponentUpadated } from '../../Hooks/itemCategory';

const AddItemCategory =(props)=> {
  const { addItemCategory, getItemCategories, itemCategory, handleClose} = props;
  const [name, _, handleChange] = useHandleChange();
  const [error, setError, isLoading, handleSubmit] = useHandleSubmit(name,addItemCategory);

  const data = {
    name,
    itemCategory,
    setError,
    getItemCategories,
    handleClose,
    dependency:props.itemCategory,
  };

  useSetError(setError, props.error);

  useComponentUpadated(data);

  return (
    <div >
      <CategoryModal
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        action={props.action}
        error={error}
        isLoading={isLoading}
        open={props.open}
        handleClose={handleClose}
        name={name}
        title="Add Item Category"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemCategories: state.itemCategoryReducer.itemCategories,
  itemCategory: state.itemCategoryReducer.itemCategory,
  error: state.itemCategoryReducer.error,
});

const mapDispatchToProps = {
  addItemCategory,
  getItemCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemCategory);
