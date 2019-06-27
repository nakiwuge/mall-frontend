import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const ModalContainer = (props)=>  {
  const { open, handleClose, renderContent } = props;

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: 'none',
    },
  }));
  const modalstyle = {
    top: '40%',
    left: '45%',
    transform: 'translate(-45%, -45%)',
  };
  const newClass = useStyles();

  return (
    <div className="modal">
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalstyle}className={newClass.paper}>
          {renderContent()}
        </div>
      </Modal>
    </div>
  );
};

export default ModalContainer;
