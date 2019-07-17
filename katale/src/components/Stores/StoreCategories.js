import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStoreCategories } from '../../Actions/storeCategory';
import TableContainer from '../common/Table';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from '../helperStyles';
import Spinner from '../common/Spinner';
import AddStoreCategory from './AddStoreCategory';
import { authService } from '../../utils/authentication';
import { getUser } from '../../Actions/UserAction';
import EditStoreCategory from './EditStoreCategory';
import DeleteStoreCategory from './DeleteStoreCategory';
class StoreCategories extends Component {
  state = {
    isLoading: true,
    open:false,
    owner:false,
    data:null,
    action:null
  }

  handleClose=()=>{
    this.setState({
      open:false,
      data:null,
      action:null,
    });
  }

  onClick=()=>{
    this.setState({
      open:true,
      data:null,
      action:'add'
    });
  }

   onEditClick=  (e)=>{
     this.setState({
       open:true,
       action:'edit',
       data:{
         id:e.target.getAttribute('id'),
         name:e.target.getAttribute('name')
       }
     });
   }
  onDeleteCick=(e)=>{
    this.setState({
      open:true,
      action:'delete',
      data:{
        id:e.target.getAttribute('id'),
        name:e.target.getAttribute('name')
      }

    });

  }

  async componentDidMount(){
    const user = await authService.decodeToken();
    this.props.getUser(user.userId);
    await this.props.getStoreCategories();
    this.setState({isLoading:false});
  }

  renderTableBody=()=>{
    const { categories, user } = this.props;

    return  categories.map(row => {
      let editClass;
      let deleteClass;
      if (user){
        editClass= (user.id!==row.createdBy.id)?'disabled':'edit';
        deleteClass=(user.id!==row.createdBy.id)?'disabled':'delete';
      }

      return <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="left">{row.createdBy.firstName}</StyledTableCell>
        <StyledTableCell align="left">{row.stores.length}</StyledTableCell>
        <StyledTableCell align="left">{moment(row.createdAt).format('DD-MM-YYYY')}</StyledTableCell>
        <StyledTableCell align="left"><i  onClick={(editClass==='edit')?this.onEditClick: null} name = {`${row.name}`} id = {`${row.id}`} className={`material-icons ${editClass}`}>edit</i></StyledTableCell>
        <StyledTableCell align="left"><i  onClick={(deleteClass==='delete')?this.onDeleteCick: null} name = {`${row.name}`} id = {`${row.id}`}  className={`material-icons ${deleteClass}`}>delete_outline</i></StyledTableCell>
      </StyledTableRow>;});
  }

  render() {
    const { categories } =this.props;
    const tableHeaders = ['Category Name','Created By', 'Numbers of Stores', 'Date Created' ,'Edit', 'Delete'];

    return (
      <React.Fragment>
        <section>
          <div className="store-categories">
            <div className="table">
              <div className="heading"><span >Store Categories</span>
                <button onClick={this.onClick}>Add Store Category</button>
              </div>
              {this.state.isLoading&&<Spinner/>}
              {(categories&&categories.length>0)
                ?<TableContainer
                  tableHeaders={tableHeaders}
                  renderTableBody={this.renderTableBody}
                />
                :<div> There are currently no Store Categories</div>
              }
            </div>
          </div>
          {
            (this.state.action==='add')
              &&<AddStoreCategory
                action={this.state.action}
                open={this.state.open}
                handleClose={this.handleClose}
              />
          }
          {
            (this.state.action==='edit')
              && <EditStoreCategory
                data={this.state.data}
                action={this.state.action}
                open={this.state.open}
                handleClose={this.handleClose}
              />
          }
          {
            (this.state.action==='delete')
              &&<DeleteStoreCategory
                action={this.state.action}
                data={this.state.data}
                open={this.state.open}
                handleClose={this.handleClose}
              />
          }
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.storeCategoryReducer.categories,
  user: state.userReducer.currentUser,
  error: state.userReducer.error,
});

const mapDispatchToProps = {
  getStoreCategories,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreCategories);
