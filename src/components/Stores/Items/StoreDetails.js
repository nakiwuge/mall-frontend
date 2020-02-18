import React, {useEffect} from 'react';
import moment from 'moment';
import { useCheckOwner } from '../../Hooks/checkOwner';
import EditStore from '../EditStore';
import DeleteStore from '../DeleteStore';
import { useModal } from '../../Hooks/modal';

const StoreDetails  = (props)=>{
  const { currentStore, currentUser } = props;
  const [isOwner,checkOwner] = useCheckOwner(currentUser, currentStore);
  const [open,action,handleClose,handleOpen]= useModal();

  useEffect(() => {
    checkOwner();
  }, [currentUser]);

  const renderStoreDetails=(store)=>{
    return ( store.owner && <div className="details">
      <div >
        <span className="label">
        Store Name:
        </span> <span className="value">{store.name}</span>
      </div>
      <div>
        <span className="label">
            Store Description:
        </span> <span className="value">{store.description}</span>
      </div>
      <div>
        <span className="label">
        Store Owner:</span>
        <span className="value">{store.owner.firstName} {store.owner.lastName} </span>
      </div>
      <div>
        <span className="label">
            Owner's Phone Number:
        </span> <span className="value">0{store.owner.phoneNumber}</span>
      </div>
      <div>
        <span className="label">
            Owner's Email:
        </span> <span className="value">{store.owner.email}</span>
      </div>
      <div>
        <span className="label">
        Date Created :
        </span> <span className="value">{moment(store.createdAt).format('DD-MM-YYYY')}</span>
      </div>
    </div>);
  };

  return(
    <div className="store-details">
      <div className="header">
        <span>Store Details</span>
      </div>
      {currentStore&&renderStoreDetails(currentStore)}
      <div className="action" hidden={!isOwner}>
        <span onClick={handleOpen} className="edit" name='edit' >Edit</span>
        <span  className="delete" name='delete' onClick={handleOpen} >Delete</span>
      </div>
      {(action==='edit')
     &&  <EditStore
       open={open}
       handleClose={handleClose}
     />}
      {(action==='delete')
     &&<DeleteStore
       open={open}
       handleClose={handleClose}
       param={currentStore&&currentStore.id}
     />}
    </div>
  );
};

export default StoreDetails;
