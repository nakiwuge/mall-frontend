import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStores, getOneStore, } from '../../Actions/store';
import imagePlaceholder from '../../Assets/images/image_placeholder.png';
import EditStore from './EditStore';
import { getStoreCategories } from '../../Actions/storeCategory';
import DeleteStore from './DeleteStore';
import { getUser } from '../../Actions/UserAction';
import { authService } from '../../utils/authentication';

class   ViewStore extends Component{
  state = {
    isLoading: false,
    error: null,
    storeName:'',
    category:'',
    selectedFile: null,
    description: '',
    showStoreDetails:false,
    showStoreItems:true,
    open:false,
    action:null,
    isOwner:false
  }

  async componentDidMount(){
    const {match} = this.props;

    await this.props.getOneStore(match.params.id);
    await this.isOwner();
  }

  handleClose = async ()=>{
    this.setState({
      open:false,
      action:null
    });
  }

  getCurrentUser = async () =>{
    const user = await authService.decodeToken();
    if(user){
      return this.props.getUser(user.userId);
    }
  }

  isOwner = async ()=>{
    await this.getCurrentUser();
    const {currentUser, store} = this.props;

    if(currentUser&&(currentUser.id===store.owner.id)){

      this.setState({isOwner:true});
    }
  }

  onEditClick= async()=>{
    await this.props.getStoreCategories();
    this.setState({
      open:true,
      action: 'edit'
    });
  }

  onDeleteClick= async()=>{
    this.setState({
      open:true,
      action: 'delete',
      id:this.props.store.id
    });
  }

  clickStoreDetails=()=>{
    this.setState(
      {
        showStoreDetails:true,
        showStoreItems:false,
      }
    );
  }

  clickAvailableItems=()=>{
    this.setState(
      {
        showStoreDetails:false,
        showStoreItems:true,
      }
    );
  }

  renderSideNav=(store)=>{

    return (

      <div className="side-nav" >
        <div className="store-name"><p>{store.name}</p></div>
        <div><img src={(store.imageUrl==='null')?imagePlaceholder:store.imageUrl}/></div>
        <div className="menu-items">
          <div onClick={this.clickAvailableItems}><p>Available Items</p></div>
          <div onClick={this.clickStoreDetails}><p>Store Details</p></div>
        </div>
      </div>
    );
  }

  renderStoreDetails=(store)=>{

    return(store.owner && <div className="details">
      <div >
        <span className="label">Store Name:</span> <span className="value">{store.name}</span>
      </div>
      <div>
        <span className="label">Store Description:</span> <span className="value">{store.description}</span>
      </div>
      <div>
        <span className="label"> Store Owner:</span> <span className="value">{store.owner.firstName} {store.owner.lastName} </span>
      </div>
      <div>
        <span className="label"> Owner's Phone Number:</span> <span className="value">0{store.owner.phoneNumber}</span>
      </div>
      <div>
        <span className="label"> Owner's Email:</span> <span className="value">{store.owner.email}</span>
      </div>
      <div>
        <span className="label"> Date Created : </span> <span className="value">{moment(store.createdAt).format('DD-MM-YYYY')}</span>
      </div>
    </div>);
  }

  render (){
    const{ store }= this.props;
    const{
      isLoading,
      showStoreItems,
      showStoreDetails,
      action,
      open,
    }= this.state;

    return (
      <section>
        <div className="view-store">
          {store&&this.renderSideNav(store)}
          <div className="content-wrapper">
            {showStoreItems && <div className="items">
              <div className="header"><span>Available Items</span>
                <span hidden={!this.state.isOwner}>
                  <button>Add Item</button>
                </span>
              </div>
            </div>}
            {showStoreDetails&&<div className="store-details">
              <div className="header">
                <span>Store Details</span>
              </div>
              {store&&this.renderStoreDetails(store)}
              <div className="action" hidden={!this.state.isOwner}>
                <span onClick = {this.onEditClick} className="edit">Edit</span>
                <span onClick = {this.onDeleteClick} className="delete">Delete</span>
              </div>
            </div>}
            {(action==='edit')
            && <EditStore
              open={open}
              handleClose={this.handleClose}
            />}
            {(action==='delete')
            && <DeleteStore
              open={open}
              handleClose={this.handleClose}
            />}
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  store: state.storeReducer.store,
  error: state.storeReducer.error,
  categories: state.storeCategoryReducer.categories,
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = {
  getOneStore,
  getStoreCategories,
  getStores,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStore);
