import React , {useEffect}from 'react';
import { connect } from 'react-redux';
import CategoryModal from '../CategoryModal';
import { getItemCategories, editItemCategory } from '../../../Actions/itemCategory';
import { useHandleSubmit, useHandleChange,useSetError, useComponentUpadated } from '../../Hooks/itemCategory';

const EditItemCategory =(props)=> {
  const { editItemCategory, getItemCategories, itemCategory, handleClose, data} = props;
  const [name,setName,handleChange] = useHandleChange();
  const id = data?data.id:null;
  const [error, setError, isLoading, handleSubmit] = useHandleSubmit(name,editItemCategory,id);

  const hookData = {
    name,
    itemCategory,
    setError,
    getItemCategories,
    handleClose,
    dependency:props.itemCategory,
  };

  useEffect(() => {
    if(data){
      setName(data.name);
    }
  }, [data]);

  useSetError(setError, props.error);

  useComponentUpadated(hookData);

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
        editName={name}
        title="Edit Item Category"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemCategories: state.itemCategoryReducer.itemCategories,
  itemCategory: state.itemCategoryReducer.updatedCategory,
  error: state.itemCategoryReducer.error,
});

const mapDispatchToProps = {
  editItemCategory,
  getItemCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItemCategory);
