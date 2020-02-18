import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStore, getStores, getOneStore} from '../../Actions/store';
import { getStoreCategories } from '../../Actions/storeCategory';
import DeleteModal from '../common/deleteModal';
import { Redirect } from 'react-router-dom';

class   DeleteStore extends Component{
  state = {
    isLoading: false,
  }

  handleDelete =  async()=>{
    await this.setState({isLoading:true});
    await this.props.deleteStore(this.props.store.id);
    await this.setState({isLoading:false});
  }

   handleCancel=  ()=>{
     this.props.handleClose();
   }

   render (){
     const{ open,handleClose, store,deletedStore, error }= this.props;
     const{ isLoading }= this.state;

     if(deletedStore && (store.id===deletedStore.id)) {

       return <Redirect to="/stores"/>;
     }

     return (
       <div >
         <DeleteModal
           name={`${store.name} Store `}
           handleDelete={this.handleDelete}
           handleCancle={this.handleCancel}
           isLoading={isLoading}
           handleClose={handleClose}
           open={open}
           error={error}
         />
       </div>
     );
   }
}
const mapStateToProps = (state) => ({
  store: state.storeReducer.store,
  deletedStore: state.storeReducer.deletedStore,
  error: state.storeReducer.error,
});

const mapDispatchToProps = {
  getStoreCategories,
  deleteStore,
  getStores,
  getOneStore
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStore);
