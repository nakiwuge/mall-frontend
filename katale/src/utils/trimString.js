export const trimString = (string, length)=>{
  const trimmeddescription = string.substring(0, length);
  const result =`${trimmeddescription}...`;

  return result;
};
