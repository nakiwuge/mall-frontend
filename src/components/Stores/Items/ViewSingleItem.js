import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCheckOwner } from '../../Hooks/checkOwner';
import { useModal } from '../../Hooks/modal';
import imagePlaceholder from '../../../Assets/images/image_placeholder.png';
import { getItem } from '../../../Actions/item';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';

const ViewSingleItem  = (props)=>{
  const { store, currentUser, updatedItem, getItem, item, match:{params,url}} = props;
  const [isOwner,checkOwner] = useCheckOwner(currentUser, store);
  const [open,action,handleClose,handleOpen]= useModal();

  const fetchItem = async ()=>{
    await  checkOwner();
    getItem(params.id);
  };

  useEffect(() => {
    fetchItem();
  }, [currentUser,updatedItem]);

  return(
    <div className="view-item">
      {item&&item.name
      &&
        <div>
          <div className="wrapper">
            <div className='left'>
              <img src={item.imageUrl==='undefined'?imagePlaceholder:item.imageUrl} />
            </div>
            <div className="right">
              <div className="header">{item.name}</div>
              <div className="price">UGX {item.price} {item.negotiable?'(Negotiable)':'(Non Negotiable)' } </div>
              <div className="contact-link">
                <Link  to={`/stores/${item.store&&item.store.id}/details`}>Seller Contact</Link>
              </div>
              <div className="contact-link" hidden={url!==`/items/${item.id}`}>
                <Link  to={`/stores/${item.store&&item.store.id}`}>Visit Store</Link>
              </div>
              <div className="actions" hidden={!isOwner}>
                <span className="edit" name='edit' onClick={handleOpen}>Edit</span>
                <span className="delete" name='delete' onClick={handleOpen}>Delete</span>
              </div>
            </div>
          </div>
          <div className="description">
            <div className="description_header">Description</div>
            <div className="description_body">{item.description}</div>
          </div>
        </div>
      }
      {(action==='edit')
      &&<EditItem
        handleClose={handleClose}
        open={open}
        item={item}
      />}
      {(action==='delete')
      &&<DeleteItem
        handleClose={handleClose}
        open={open}
        item={item}
        storeId={store.id}
      />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  store: state.storeReducer.store,
  item:state.itemReducer.item,
  updatedItem:state.itemReducer.updatedItem,
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = {
  getItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSingleItem);
