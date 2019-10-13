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
import { getItems } from '../../../Actions/item';

const NewCard = styled(Card)({
  width: 320,
});

const NewCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '70%', // 16:9
});

const AllItems  = (props)=>{
  const {items,getItems} = props;
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
    getItems().then(
      ()=>{
        setLoading(false);
      });

  },[items]);

  const renderCard = (items)=>{
    return items.map(item=>(
      <div className="card" key={item.id}>
        <Link to={`/items/${item.id}`}>
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
      <div className="items">
        {isLoading&&<Spinner/>}
        {(items&&items.length>0)&&renderCard(items)}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({itemReducer}) => ({
  items: itemReducer.items,
  error: itemReducer.error,
});

const mapDispatchToProps = {
  getOneStore,
  getItems
};

export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
