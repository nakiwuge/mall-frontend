import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStoreCategory, getStoreCategories } from '../../Actions/storeCategory';
import DeleteModal from '../common/deleteModal';

class DeleteStoreCategory extends Component {
  state = {
    isLoading:false,
    error:null,
    id:null
  }
  componentWillReceiveProps(){
    const {data,handleClose,category} = this.props;
    if (category){
      if(category.id==data.id){
        this.props.getStoreCategories();
        handleClose();
      }

    }}
handleDelete =  async()=>{

  const {data} = this.props;
  const id = data?data.id:null;

  await this.setState({isLoading:true});
  await this.props.deleteStoreCategory(id);
  await this.setState({isLoading:false});
}

handleCancel=  ()=>{
  this.props.handleClose();
}

render() {
  const {data, handleClose, category}=this.props;

  if (category){
    if(category.id==data.id){

      this.props.getStoreCategories();
      handleClose();
    }
  }

  return (
    <div className="delete">
      <DeleteModal
        name={`${data&&data.name} Store Category`}
        handleDelete={this.handleDelete}
        handleCancle={this.handleCancel}
        isLoading={this.state.isLoading}
        handleClose={handleClose}
        open={this.props.open}
        error={this.props.error}
      />
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  category: state.storeCategoryReducer.deletedCategory,
  error: state.storeCategoryReducer.error,
});

const mapDispatchToProps = {
  deleteStoreCategory,
  getStoreCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStoreCategory);
