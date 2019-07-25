import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalContainer from '../common/modal';
import Typography from '@material-ui/core/Typography';
import { CssTextField } from '../Auth/overideStyles';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SelectContainer from '../common/Select';
import FileUpload from '../common/fileUpload';
import { Capitalise, hasNoEmptyFields } from '../../utils/validation';
import { editStore, getStores, getOneStore} from '../../Actions/store';
import { getStoreCategories } from '../../Actions/storeCategory';
import imagePlaceholder from '../../Assets/images/image_placeholder.png';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#b71c1c'},
    secondary:{main:'#298FBE'},
    error: { main:'#f44336' }
  },
});

class   EditStore extends Component{
  state = {
    isLoading: false,
    error: null,
    storeName:'',
    category:'',
    selectedFile: null,
    description: '',
    isValid:false

  }

  componentDidMount(){
    const { store } = this.props;
    if (store){
      this.setState({
        storeName:store.name,
        category:store.category&&store.category.id,
        description:store.description
      });
    }
  }

  handleChange =  name =>  (event)=>{
    const { value, files } = event.target;

    if(name==='image'){
      this.setState({ selectedFile:files[0]});
    }

    this.setState({[name]:Capitalise(value)});
  }

   handleSubmit=async()=>{
     const {selectedFile,storeName,category,description} = this.state;

     const data = {
       id:this.props.store.id,
       selectedFile,
       name:storeName,
       imageUrl:this.props.store.imageUrl,
       category,
       description
     };

     const valid =await  hasNoEmptyFields({storeName,category,description});
     if (!valid){
       return this.setState({error: 'Please Fill in all fields on this form'});
     }

     this.setState({isLoading:true});
     this.props.editStore(data).then(async()=>{
       if (this.props.store){
         if(this.props.store.id===data.id){
           await  this.props.getOneStore(this.props.store.id);
           this.setState({isLoading:false});
           this.props.handleClose();
         }
       }
     });
   }

  renderContent =()=>{
    const { store }=this.props;
    const { error, isLoading, storeName, category, description}=this.state;

    return(
      <div  className="edit-store">
        <div>
          <Typography variant="h5" id="modal-title" color="secondary" >
            Edit Store
          </Typography>
          <Typography variant="subtitle2" id="simple-modal-description" color="error" >
            <div className="error">{error?error:this.props.error}</div>
          </Typography>
          <div className="store-name">
            <CssTextField
              id="standard-email"
              label="Name"
              margin="normal"
              fullWidth
              onChange={this.handleChange('storeName')}
              value={storeName}
            />
          </div>
          <CssTextField
            id="standard-email"
            label="Description"
            margin="normal"
            fullWidth
            onChange={this.handleChange('description')}
            value={description}
          />
          <SelectContainer
            menuItems={this.props.categories?this.props.categories:null}
            label="Select Category"
            selectValue={category}
            name="category"
            handleChange={this.handleChange('category')}
          />
          <div className="image-wrapper">
            <p>Edit Image</p>
            <span className="image">
              <img src={(store.imageUrl==='null')?imagePlaceholder:store.imageUrl}/>
            </span>
            <span className="upload">
              <FileUpload
                handleChange={this.handleChange}
              />
            </span>
          </div>
          <div  hidden = {isLoading}>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              style={{
                borderRadius: 5,
                backgroundColor: '#d32f2f',
                padding: '10px 20px',
                fontSize: '18px',
                color: 'white',
              }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  };
  render (){
    const{ open,handleClose }= this.props;
    const{ isLoading }= this.state;

    return (
      <div >
        <ThemeProvider theme={theme}>
          <ModalContainer
            open={open}
            handleClose={handleClose}
            renderContent = {this.renderContent}
            isLoading={isLoading}
          />
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state.storeReducer.store,
  error: state.storeReducer.error,
  categories: state.storeCategoryReducer.categories
});

const mapDispatchToProps = {
  getStoreCategories,
  editStore,
  getStores,
  getOneStore
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStore);
