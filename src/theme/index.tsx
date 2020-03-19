
import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[800],
    },
    secondary: {
      main: pink[500],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#efefef',
    },
  },
});

export default theme;
