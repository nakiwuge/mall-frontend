import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DeleteModal from '../../common/deleteModal';
import { deleteItemCategory, getItemCategories } from '../../../Actions/itemCategory';
import { deleteItem } from '../../../Actions/item';
import { withRouter } from 'react-router-dom';

const  DeleteItem = (props)=>{
  const {item, handleClose, storeId, open, error,deleteItem,deleted, history}=props;
  const [isLoading, setLoading] = useState(false);

  const handleDelete =  async()=>{
    const id = item?item.id:null;

    setLoading(true);
    await deleteItem(id);
    setLoading(false);
  };

  const handleCancel =  ()=>{
    handleClose();
  };

  const handleRedirect = async()=>{
    await handleClose();
    history.push(`/stores/${storeId}`);
  };

  useEffect(() => {
    if (deleted.id == item.id){
      handleRedirect();
    }
  }, [deleted]);

  return (
    <div className="delete">
      <DeleteModal
        name={`${item&&item.name} Item`}
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
  deleted: state.itemReducer.deleted,
  error: state.itemCategoryReducer.error,
});

const mapDispatchToProps = {
  deleteItemCategory,
  getItemCategories,
  deleteItem
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteItem));
