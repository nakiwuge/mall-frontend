import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = ()=>  {

  return (
    <div className="spinner">
      <div className="loader"><CircularProgress  color="secondary" /> </div>
      <div className="text">Loading...</div>
    </div>
  );
};

export default Spinner;
