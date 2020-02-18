import { useState } from 'react';

export const useModal= ()=>{
  const [open, setOpen, ] = useState(false);
  const [action, setAction] = useState(null);

  const handleClose = async ()=>{
    setOpen(false);
  };

  const handleOpen = async (event)=>{
    const name = event.target.getAttribute('name');
    switch(name){
    case 'edit':
      setAction('edit');
      setOpen(true);

      break;
    case 'delete':
      setAction('delete');
      setOpen(true);
      break;
    default:
      setAction(null);
      return setOpen(true);
    }
  };

  return [open,action,handleClose, handleOpen];
};
