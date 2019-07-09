import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#d32f2f'},
  },
});

const Spinner = ()=>  {

  return (
    <div className="spinner">
      <ThemeProvider theme ={theme}>
        <div className="loader"><CircularProgress  color="primary" /> </div>
      </ThemeProvider>
    </div>
  );
};

export default Spinner;
