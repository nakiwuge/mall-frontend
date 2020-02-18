import  { useState } from 'react';

export const useCheckOwner = (currentUser, store)=>{
  const [isOwner, setOwner, ] = useState(false);
  const checkOwner =  ()=>{
    if(currentUser&&store&&store.owner&&(currentUser.id===store.owner.id)){
      setOwner(true);
    }
  };

  return [isOwner,checkOwner];
};

