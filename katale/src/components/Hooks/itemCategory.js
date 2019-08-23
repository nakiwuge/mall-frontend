import { useState, useEffect } from 'react';

export const useHandleSubmit = (name, func, id=null)=>{
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelSubmit =() =>{
    if (name.trim().length<3 || name.trim().length>50){
      setError('Name should contain atleast 3 letters');
      return;
    }
    setLoading(true);
    if (id){
      return func(name, id).then(()=>{
        setLoading(false);
      });
    }
    func(name).then(()=>{
      setLoading(false);
    });

  };

  return [ error,setError,isLoading, handelSubmit ];
};

export const useHandleChange = ()=>{
  const [name, setName]= useState('');

  const handleChange =(event)=>{
    setName(event.target.value);
  };

  return [name,setName,handleChange];
};

export const useSetError =(setError, error)=>{
  useEffect(()=>{
    setError(error);
  }, [error]);
};

export const useComponentUpadated = (data)=>{
  const { itemCategory,setError, handleClose, dependency,name} = data;

  useEffect( () => {
    if(itemCategory
        && (itemCategory.name.toLowerCase() === name.toLowerCase())){
      setError(null);
      handleClose();
    }

  }, [dependency]);
};
