import React from 'react';
import ModalContainer from '../common/modal';
import Typography from '@material-ui/core/Typography';
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

const  DeleteModal = (props)=>{
  const {
    name,
    handleDelete,
    handleCancle,
    isLoading,
    handleClose,
    open,
    error
  }=props;

  const  renderContent =()=>{

    return(
      <div className="delete-modal"  id="deleteModal">
        <div>
          <Typography variant="h4" id="modal-title" color="primary" >
            This Action cannot be undone!
          </Typography>
          <Typography variant="h6" id="modal-title" color="secondary" >
          Are you sure you want to delete {name}?
          </Typography>
          <Typography variant="subtitle2" id="simple-modal-description" color="error" >
            <div className="error">{error}</div>
          </Typography>
          <div  hidden = {isLoading}>
            <Button
              onClick={handleCancle}
              variant="contained"
              style={{
                borderRadius: 5,
                backgroundColor: '#298FBE',
                padding: '10px 10px',
                fontSize: '15px',
                color:'white',
                marginTop:'20px',
                marginLeft:'70px'
              }}
              type="submit"
            >
              Cancel
            </Button>

            <Button
              onClick={handleDelete}
              variant="contained"
              style={{
                borderRadius: 5,
                backgroundColor: '#d32f2f',
                padding: '10px 10px',
                fontSize: '15px',
                color:'white',
                marginTop:'20px',
                marginLeft:'150px'
              }}
              type="submit"
            >
              Delete
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

export default DeleteModal;
