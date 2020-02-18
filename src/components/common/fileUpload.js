import React from 'react';

const FileUpload = (props)=>  {
  const { label, handleChange, name}= props;

  return (
    <div className="file-upload">
      <label htmlFor="upload" >
        {label}
      </label>
      {name
        ?<input id="upload" type="file" onChange={handleChange} name={name} />
        :<input id="upload" type="file" onChange={handleChange('image')}  />}
    </div>
  );
};

export default FileUpload;
