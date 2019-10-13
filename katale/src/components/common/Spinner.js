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
    <div className="loader">
      <ThemeProvider theme ={theme}>
        <CircularProgress  color="primary" />
      </ThemeProvider>
    </div>
  );
};

export default Spinner;
