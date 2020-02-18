import { hasNoEmptyFields } from '../../utils/validation';

export const useHandleSubmit = (submitData, itemProps, handleClose,url)=>{
  const {data, setError,resetState,setLoading,param, func, id} = submitData;

  const {selectedFile,name,price,category,description, negotiable} = data;
  const formData = {
    selectedFile,
    name,
    category,
    description,
    price,
    negotiable:negotiable&&negotiable.yes?true:false,
    store:param
  };

  const handleSubmit = async () =>{

    if(JSON.stringify(data)==JSON.stringify(itemProps)){
      return handleClose();
    }

    const valid = await hasNoEmptyFields({name,price,category,description});
    if (!valid){
      return setError('Please Fill in all fields on this form');
    }

    if(!negotiable.yes && !negotiable.no){
      return setError('Please select an option for the negotiable field');
    }
    setLoading(true);
    if (id){
      formData.id=id;
      formData.imageUrl=url;

      return func(formData).then(async()=>{
        setLoading(false);
        await resetState();
      });
    }

    await func(formData);
    setLoading(false);
    await resetState();
  };

  return  [handleSubmit];
};

export const useHandleChange = (data,setData,setError)=>{
  const handleChange =(event)=>{
    const { name, files, value} = event.target;
    setError(null);

    switch (name){
    case 'yes':
      setData({
        ...data,
        negotiable:{
          yes:true,
          no: false
        }});
      break;
    case 'no':
      setData({
        ...data,
        negotiable:{
          yes:false,
          no: true
        }});
      break;
    case 'image':
      setData({
        ...data,
        selectedFile:files[0]
      });
      break;
    default:
      setData({
        ...data,
        [name]:value
      });

      return;
    }
  };

  const resetState = ()=>{
    setData({
      name:'',
      description: '',
      selectedFile: null,
      price: '',
      category: '',
      negotiable: {
        yes: false,
        no: false
      }
    });
    setError(null);
  };

  return [handleChange,resetState];
};
