import React from 'react';
import ModalContainer from '../common/modal';
import Typography from '@material-ui/core/Typography';
import { CssTextField } from '../Auth/overideStyles';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#b71c1c'},
    secondary:{main:'#298FBE'},
    error: { main:'#f44336' }
  },
});

const  StoreCategoryModal = (props)=>{
  const {
    handleChange,
    handleSubmit,
    action,
    error,
    isLoading,
    open,
    handleClose,
    editName,
    name
  }=props;

  const  renderContent =()=>{

    return(
      <div >
        <div>
          <Typography variant="h5" id="modal-title" color="secondary" >
            { (action==='edit')?'Edit Store Category':'Add Store Category'}
          </Typography>
          <Typography variant="subtitle2" id="simple-modal-description" color="error" >
            <div className="error">{error}</div>
          </Typography>
          <CssTextField
            id="standard-email"
            label="Name"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value={(action==='edit')?editName: name}
          />
          <div  hidden = {isLoading}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{
                borderRadius: 5,
                backgroundColor: '#d32f2f',
                padding: '10px 20px',
                fontSize: '18px',
                color:'white',
              }}
              type="submit"
            >
              {(action==='add')?'Submit': 'Edit'}
            </Button>
          </div>
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

export default StoreCategoryModal;
