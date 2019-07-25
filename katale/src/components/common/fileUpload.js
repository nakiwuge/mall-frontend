import React from 'react';

const FileUpload = (props)=>  {
  const { label, handleChange}= props;

  return (
    <div className="file-upload">
      <label htmlFor="upload" >
        {label}
      </label>
      <input id="upload" type="file" onChange={handleChange('image')}/>
    </div>
  );
};

export default FileUpload;
