import React from 'react';
import { withStyles,createMuiTheme} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

export const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#ffff',
    color: '#00000',
    borderColor:'#B71B1C',
    fontSize:16,
    fontWeight:'bold'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export const themeCreater= (primaryColor,secondaryColor,errorColour )=>{
  const theme = createMuiTheme({
    palette: {
      primary: {main:`${primaryColor?primaryColor: '#b71c1c'}`},
      secondary:{main:`${secondaryColor?secondaryColor: '#298FBE'}`},
      error: { main:`${errorColour?errorColour: '#f44336'}`}
    },
  });
  return theme;

};

export const NewCheckbox = withStyles({
  root: {
    color: '#d32f2f',
    '&$checked': {
      color: '#d32f2f',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);
