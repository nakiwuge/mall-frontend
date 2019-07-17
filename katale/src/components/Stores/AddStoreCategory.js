import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStoreCategory, getStoreCategories } from '../../Actions/storeCategory';
import StoreCategoryModal from './StoreCategoryModal';

class AddStoreCategory extends Component {
  state = {
    isLoading:false,
    name: '',
    isValid:false,
    error:null
  }

  handleChange=(e)=>{
    this.setState({
      name:e.target.value
    });
  }

handleSubmit=  ()=>{
  const {name} =this.state;

  if (name.trim().length<3 || name.trim().length>50){
    this.setState({
      error: 'Name should contain atleast 3 letters'
    });
    return;
  }

  this.setState({
    isLoading: true
  });

  this.props.addStoreCategory(name).then(()=>{
    this.setState({
      isLoading: false
    });

    if (this.props.category){
      this.setState({
        error: null
      });

      this.props.getStoreCategories();
      this.props.handleClose();
    }

    if (this.props.error){
      this.setState({
        error: this.props.error
      });
    }
  });
}

render() {

  return (
    <div >
      <StoreCategoryModal
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        action={this.props.action}
        error={this.state.error}
        isLoading={this.state.isLoading}
        open={this.props.open}
        handleClose={this.props.handleClose}
        name={this.state.name}
      />
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  category: state.storeCategoryReducer.category,
  error: state.storeCategoryReducer.error,

});

const mapDispatchToProps = {
  addStoreCategory,
  getStoreCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStoreCategory);
