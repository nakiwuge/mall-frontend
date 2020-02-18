import React from 'react';
import ModalContainer from '../../common/modal';
import Typography from '@material-ui/core/Typography';
import { CssTextField } from '../../Auth/overideStyles';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import SelectContainer from '../../common/Select';
import FileUpload from '../../common/fileUpload';
import { currency} from '../../../utils/validation';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import imagePlaceholder from '../../../Assets/images/image_placeholder.png';
import { themeCreater, NewCheckbox} from '../../helperStyles';

const theme = themeCreater();

const  ItemModal =({
  categories,
  error,
  handleChange,
  data:{
    category,
    price,
    negotiable,
    name,
    description
  },
  isLoading,
  handleSubmit,
  open,
  handleClose,
  action,
  imageUrl
})=>{

  const renderContent =  ()=>{
    return(
      <div className="add-item">
        <Typography variant="h5" id="modal-title" color="secondary" >
          {action==='edit'?'Edit Item':'Add Item'}
        </Typography>
        <Typography variant="subtitle2" id="simple-modal-description" color="error" >
          <div className="error">{error}</div>
        </Typography>
        <div >
          <CssTextField
            id="standard-email"
            label="Name"
            margin="normal"
            fullWidth
            onChange={handleChange}
            name="name"
            value={name}
          />
        </div>
        <SelectContainer
          menuItems={categories?categories:[]}
          label="Select Category"
          selectValue={category}
          name="category"
          handleChange={handleChange}
        />
        <CssTextField
          id="standard-email"
          label="Description"
          multiline
          placeholder="Description can be color, size or anything else..."
          margin="normal"
          fullWidth
          onChange={handleChange}
          name="description"
          value={description}
        />
        <CssTextField
          id="standard-email"
          label="Price (Ugx)"
          margin="normal"
          fullWidth
          onChange={handleChange}
          name="price"
          value= {currency(price)}
        />
        <div className="checkbox">
          <span className="negotiable">Negotiable</span>
          <FormControlLabel
            label="Yes"
            control={
              <NewCheckbox
                checked={negotiable?negotiable.yes:null}
                name="yes"
                onChange={handleChange}
              />
            }
          />
          <FormControlLabel
            label="No"
            control={
              <NewCheckbox
                name="no"
                checked={negotiable?negotiable.no:null}
                onChange={handleChange}
              />
            }
          />
        </div>
        <div hidden={!(action==='edit')} className="image-wrapper">
          <p>Edit Image</p>
          <span className="image">
            <img src={(imageUrl==='undefined')?imagePlaceholder:imageUrl}/>
          </span>
          <span className="upload">
            <FileUpload
              name="image"
              handleChange={handleChange}
            />
          </span>
        </div>
        <div hidden={action==='edit'}>
          <FileUpload
            label='Add Item Image'
            name="image"
            handleChange={handleChange}
          />
        </div>
        <div  hidden = {isLoading}>
          <Button
            onClick={handleSubmit}
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
    );
  };

  return (
    <div >
      <ThemeProvider theme={theme}>
        <ModalContainer
          open={open}
          handleClose={handleClose}
          renderContent = {renderContent}
          isLoading={isLoading}
        />
      </ThemeProvider>
    </div>
  );
};
export default ItemModal;
