// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);

  let theme = createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: "#FFFFFF",
        secondary: paletteColor.grey[200],
        disabled: paletteColor.grey[400]
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      // divider: paletteColor.grey[200],
      background: {
        paper: paletteColor.backgrounds.card,
        default: paletteColor.backgrounds.main
      },
      selectedPredict:{
        main: '#FFFFFF'
      },
      defaultPredict:{
        main: paletteColor.grey[400]
      },
      predictButton:{
        main: paletteColor.primary.main,
        dark: paletteColor.primary.main
      },

    }
  });
  return theme
};

export default Palette;
