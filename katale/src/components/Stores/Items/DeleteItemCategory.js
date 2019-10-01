import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DeleteModal from '../../common/deleteModal';
import { deleteItemCategory, getItemCategories } from '../../../Actions/itemCategory';

const  DeleteItemCategory = (props)=>{
  const {data, handleClose, category, open, error }=props;
  const [isLoading, setLoading] = useState(false);

  const handleDelete =  async()=>{
    const {data} = props;
    const id = data?data.id:null;

    setLoading(true);
    await props.deleteItemCategory(id);
    setLoading(false);
  };

  const handleCancel =  ()=>{
    props.handleClose();
  };

  useEffect(() => {
    if (category.id == data.id){
      handleClose();
    }
  }, [category]);

  return (
    <div className="delete">
      <DeleteModal
        name={`${data&&data.name} Store Category`}
        handleDelete={handleDelete}
        handleCancle={handleCancel}
        isLoading={isLoading}
        handleClose={handleClose}
        open={open}
        error={error}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  category: state.itemCategoryReducer.deletedCategory,
  error: state.itemCategoryReducer.error,
});

const mapDispatchToProps = {
  deleteItemCategory,
  getItemCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemCategory);
