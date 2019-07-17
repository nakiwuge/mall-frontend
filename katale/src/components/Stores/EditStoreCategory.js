import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editStoreCategory, getStoreCategories } from '../../Actions/storeCategory';
import StoreCategoryModal from './StoreCategoryModal';

class EditStoreCategory extends Component {
  state = {
    isLoading:false,
    name: '',
    isValid:false,
    error:null
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.data){
      this.setState({
        name: nextProps.data.name
      });
    }
  }

  componentDidMount(){
    if(this.props.data){
      this.setState({
        name: this.props.data.name
      });
    }
  }

  handleChange=(e)=>{
    this.setState({
      name:e.target.value
    });
  }

  handleSubmit=()=>{
    const {name} =this.state;
    const id = this.props.data?this.props.data.id:null;

    if (name.trim().length<3 || name.trim().length>50){
      this.setState({
        error: 'Name should contain atleast 3 letters'
      });
      return;
    }

    this.setState({
      isLoading: true
    });

    this.props.editStoreCategory(name, id).then(()=>{
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
          editName={ this.state.name}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.storeCategoryReducer.updatedCategory,
  error: state.storeCategoryReducer.error,

});

const mapDispatchToProps = {
  editStoreCategory,
  getStoreCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStoreCategory);
