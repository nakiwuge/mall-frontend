import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TableContainer from '../../common/Table';
import moment from 'moment';
import { StyledTableCell, StyledTableRow } from '../../helperStyles';
import Spinner from '../../common/Spinner';
import { getItemCategories } from '../../../Actions/itemCategory';
import AddItemCategory from './AddItemCategory';
import EditItemCategory from './EditItemCategory';
import DeleteItemCategory from './DeleteItemCategory';

const ItemCategories =  (props)=>{

  const [isLoading, setLoading] = useState(false);
  const [open, setOpen]= useState(false);
  const [data, setData] = useState(null);
  const [action, setAction] = useState(null);
  const { getItemCategories, itemCategories} = props;

  const handleClose = async ()=>{
    getItemCategories();
    await setData(null);
    await setAction(null);
    setOpen(false);
  };

  const openAddModal=()=>{
    setOpen(true);
    setData(null);
    setAction('add');
  };

  const  onEditClick=  (e)=>{
    setOpen(true);
    setData({
      id:e.target.getAttribute('id'),
      name:e.target.getAttribute('name')
    });
    setAction('edit');
  };

  const onDeleteCick=(e)=>{
    setOpen(true);
    setData({
      id:e.target.getAttribute('id'),
      name:e.target.getAttribute('name')
    });
    setAction('delete');
  };

  const fetchCategories= async ()=>{
    getItemCategories();
    setLoading(false);
  };
  useEffect(() => {

    fetchCategories();
  }, []);

  const renderTableBody=()=>{
    const { itemCategories} = props;

    return  itemCategories.map(row => {

      return <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>

        <StyledTableCell align="left">{row.createdBy.firstName}</StyledTableCell>
        <StyledTableCell align="left">{row.items.length}</StyledTableCell>
        <StyledTableCell align="left">{moment(row.createdAt).format('DD-MM-YYYY')}</StyledTableCell>
        <StyledTableCell align="left"><i  onClick={onEditClick} name = {`${row.name}`} id = {`${row.id}`} className="material-icons edit">edit</i></StyledTableCell>
        <StyledTableCell align="left"><i  onClick={onDeleteCick} name = {`${row.name}`} id = {`${row.id}`}  className="material-icons delete">delete_outline</i></StyledTableCell>
      </StyledTableRow>;});
  };

  const tableHeaders = ['Category Name','Created By', 'Numbers of Items', 'Date Created' ,'Edit', 'Delete'];

  return (
    <React.Fragment>
      <section>
        <div className="store-categories">
          <div className="table">
            <div className="heading"><span >Item Categories</span>
              <button onClick={openAddModal}>Add Item Category</button>
            </div>
            {isLoading&&<Spinner/>}
            {(itemCategories&&itemCategories.length>0)
              ?<TableContainer
                tableHeaders={tableHeaders}
                renderTableBody={renderTableBody}
              />
              :<div> There are currently no Item Categories</div>
            }
          </div>
        </div>
        {
          (action==='add')
              &&<AddItemCategory
                action={action}
                open={open}
                handleClose={handleClose}
              />
        }
        {
          (action==='edit')
              && <EditItemCategory
                data={data}
                action={action}
                open={open}
                handleClose={handleClose}
              />
        }
        {
          (action==='delete')
              &&<DeleteItemCategory
                action={action}
                data={data}
                open={open}
                handleClose={handleClose}
              />
        }
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  itemCategories: state.itemCategoryReducer.itemCategories,
  error: state.userReducer.error,
});

const mapDispatchToProps = {
  getItemCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCategories);
