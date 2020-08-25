  
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFDE03',
    },
    secondary: {
      main: '#FF0266',
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: '#FCA8B2',
      default: '#FFDE03',
    },
    color: {
      default: '#ffffff',
    },
    footer:{
      default: '#353535',
    },
    button:{
      default: '#29BA80',
    },
    text: {
      primary: '#000000',
      secondary: '#1c1f1e',
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
});

export default theme;