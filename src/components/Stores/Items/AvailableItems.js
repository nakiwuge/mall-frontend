import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../../common/Spinner';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import imagePlaceholder from '../../../Assets/images/image_placeholder.png';
import { trimString } from '../../../utils/trimString';
import { getOneStore } from '../../../Actions/store';
import { useCheckOwner } from '../../Hooks/checkOwner';
import AddItem from './AddItem';
import { useModal } from '../../Hooks/modal';
import Search from '../../common/search';

const NewCard = styled(Card)({
  width: 338,
});

const NewCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '70%', // 16:9
});

const Items  = (props)=>{
  const {items,store, getOneStore, storeId, currentUser, match} = props;
  const [isLoading, setLoading] = useState(true);
  const [isOwner,checkOwner] = useCheckOwner(currentUser, store);
  const [open,_,handleClose,handleOpen]= useModal();

  useEffect(()=>{
    getOneStore(storeId).then(
      ()=>{
        checkOwner();
        setLoading(false);
      });

  },[currentUser,items]);

  const renderCard = (items)=>{
    return items.map(item=>(
      <div className="card" key={item.id}>
        <Link to={`${match.url}/items/${item.id}`}>
          <NewCard >
            <NewCardMedia
              image={(!item.imageUrl || item.imageUrl.length <10 )?imagePlaceholder:item.imageUrl}
            />
            <div className="card-content">
              <CardContent>
                <Typography variant="subtitle2" color="primary" >
                  {item.name}
                </Typography>
                <Typography variant="subtitle2" color="secondary" >
                  {item.description.length<=35?item.description:trimString(item.description,35)}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  <span className="price">UGX {item.price}</span>
                  <span className="negotiable">{item.negotiable&&'Negotiable'}</span>
                </Typography>
              </CardContent>
            </div>
          </NewCard>
        </Link>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <section>
        <div className="items">
          <header>
            <div >
              <span className="title">Available Items</span>
              <Search/>
              <div className="add-button" hidden={!isOwner}>
                <button onClick={handleOpen}>Add Item</button>
              </div>
            </div>
          </header>
          {isLoading&&<Spinner/>}
          {(store&&currentUser&&items&&items.length>0)&&renderCard(items)}
        </div>
        <AddItem
          open={open}
          handleClose={handleClose}
          param={storeId}
        />
      </section>
    </React.Fragment>
  );
};

const mapStateToProps = ({itemReducer, storeReducer, userReducer}) => ({
  items: storeReducer.storeItems,
  store: storeReducer.store,
  error: itemReducer.error,
  currentUser: userReducer.currentUser,
});

const mapDispatchToProps = {
  getOneStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
