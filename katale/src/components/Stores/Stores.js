import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import { trimString } from '../../utils/trimString';
import imagePlaceholder from '../../Assets/images/image_placeholder.png';
import { getStores } from '../../Actions/store';

const NewCard = styled(Card)({
  width: 351,
});

const NewCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '70%', // 16:9
});

class Stores extends Component {
  state = {
    isLoading: true,
  }

  async componentDidMount(){
    await this.props.getStores();
    this.setState({isLoading:false});
  }

  renderCard = (stores)=>{
    return stores.map(store=>(
      <div className="card" key={store.id}>
        <Link to={`stores/${store.id}`}>
          <NewCard >
            <NewCardMedia
              image={(store.imageUrl==='null')?imagePlaceholder:store.imageUrl}
            />
            <div className="card-content">
              <CardContent>
                <Typography variant="h6" color="primary" >
                  {store.name}
                </Typography>
                <Typography variant="subtitle2" color="secondary" >
             Category: <span>{store.category.name}</span>
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  {store.description.length<=48?store.description:trimString(store.description,48)}
                </Typography>
              </CardContent>
            </div>
          </NewCard>
        </Link>
      </div>
    ));
  }

  render() {
    const {stores} = this.props;
    const {isLoading} =this.state;

    return (
      <React.Fragment>
        <section>
          <div className="stores">
            {isLoading&&<Spinner/>}
            {(stores&&stores.length>0)&&this.renderCard(stores)}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  stores: state.storeReducer.stores,
  error: state.storeReducer.error,
});

const mapDispatchToProps = {
  getStores
};

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
