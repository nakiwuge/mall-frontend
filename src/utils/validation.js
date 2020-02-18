export const hasNoEmptyFields= async (data)=>{
  let emptyFields=[];

  await Object.keys(data).map(key =>{
    if (data[key].trim().length<1){

      emptyFields.push(data[key]);
    }
  });
  if (emptyFields.length<1){
    return true;
  }
  return false;
};

export const Capitalise =(string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);

};

export const toTitleCase = (string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const currency = (string)=>{
  const toNumber = string&&parseInt(string.replace(/\D/g, ''));

  if(isNaN(toNumber)){
    return '';
  }

  return toNumber.toLocaleString();
};
