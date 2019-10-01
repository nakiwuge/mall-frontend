import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStores, getOneStore, } from '../../Actions/store';
import imagePlaceholder from '../../Assets/images/image_placeholder.png';
import { getStoreCategories } from '../../Actions/storeCategory';
import { getUser } from '../../Actions/UserAction';
import Items from './Items/AvailableItems';
import { Route, Switch , Link, } from 'react-router-dom';
import StoreDetails from './Items/StoreDetails';

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
  }

  handleClose = async ()=>{
    this.setState({
      action:null,
      open:false,
    });
  }

  onEditClick= async()=>{
    await this.props.getStoreCategories();
    this.setState({
      open:true,
      action: 'edit'
    });
  }
  onAddClick= async()=>{
    this.setState({
      open:true,
      action: 'add'
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
    const {match}= this.props;

    return (
      <div className="side-nav" >
        <div className="store-name"><p>{store.name}</p></div>
        <div><img src={(store.imageUrl==='null')?imagePlaceholder:store.imageUrl}/></div>
        <div className="menu-items">
          <div ><p><Link to={`/stores/${match.params.id}/items`}>Available Items</Link></p></div>
          <div ><p><Link to={`/stores/${match.params.id}/details`}>Store Details</Link></p></div>
        </div>
      </div>
    );
  }

  render (){
    const{ store,match }= this.props;
    const{ isOwner }= this.state;

    return (
      <section>
        <div className="view-store">
          {store&&this.renderSideNav(store)}
          <div className="content-wrapper">
            <div>
              <Switch>
                <Route path={`${match.url}/items`} render={(props) => <Items {...props} storeId={match.params.id} isOwner={isOwner}/> }/>
                <Route path={`${match.url}/details`} render={(props) => <StoreDetails {...props} currentStore={store} /> }/>
              </Switch>
            </div>
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
