import { getTheme, ITheme } from '@uifabric/styling';

const theme = getTheme();
export const detailPaneStyleSet = [
  {
    pane: {
      maxWidth: 400,
      border: '1px solid ' + theme.palette.themeLight,
    },
    wrapper: {
      minHeight: '40vh',
      height: '100%',
      position: 'relative',
      maxHeight: 'inherit',
    },
    sticky: {
      color: theme.palette.themeDark,
      padding: '5px 20px 5px 10px',
      fontSize: '13px',
      borderTop: '1px solid ' + theme.palette.black,
      borderBottom: '1px solid ' + theme.palette.black,
    },
  },
];
