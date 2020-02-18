import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const SelectContainer = (props)=>  {
  const { handleChange, selectValue, menuItems , label, name,id}= props;

  return (
    <div className="select" id={id}>
      <FormControl  fullWidth>
        <InputLabel   htmlFor={name}>{label}</InputLabel>
        <Select
          value={selectValue}
          onChange={handleChange}
          inputProps={{
            name: name,
            id: name,
          }}
        >
          {menuItems&&menuItems.map(item =>(
            <MenuItem  value={item.id} key={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl >
    </div>
  );
};

export default SelectContainer;
