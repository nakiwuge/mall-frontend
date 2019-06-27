import { withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
  }})(TextField);
