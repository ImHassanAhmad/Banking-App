import type { IThemeMode } from '@app/common/types';
// eslint-disable-next-line no-restricted-imports
import type { PaletteOptions } from '@mui/material/styles/createPalette';
import { type ThemeOptions, createTheme } from '@mui/material';

interface CustomPaletteOptions extends PaletteOptions {
  blue?: {
    main: string;
  };
}

export const getTheme = (mode: IThemeMode): ThemeOptions => {
  const dark = mode === 'DARK';
  return createTheme({
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    palette: {
      primary: {
        main: '#BAFF2A',
        dark: '#0240C7',
        900: '#0240C7',
        800: '#234feb',
        700: '#2F65F6',
        500: '#4685FD',
        300: '#6DAFFF',
        100: '#A4DAFF',
        50: '#BAFF2A'
      },
      secondary: {
        main: '#326eb3'
      },
      warning: {
        main: '#D3A117',
        dark: '#BF900F',
        contrastText: '#fff'
      },
      error: {
        main: '#D80909',
        dark: '#C70202',
        light: '#ED725D'
      },
      blue: {
        main: '#286EF5' // Your custom blue color
      },
      success: {
        main: '#07B375',
        dark: '#4CAF50',
        light: '#01915F'
      },
      info: {
        main: '#F3F5F8',
        dark: '#E7EBF1',
        light: '#f2ffd6'
      },
      common: {
        black: '#000000',
        white: '#FFFFFF'
      },
      grey: {
        800: '#212526',
        700: '#EBEBEB',
        600: '#5F686E',
        400: '#96A1AC',
        300: 'rgba(0, 0, 0, 0.60)',
        200: '#F2F2F2',
        100: '#F3F5F8',
        50: '#FAFBFC'
      },
      text: {
        primary: '#000000'
      },
      divider: '#e0e0e0'
    } as CustomPaletteOptions,
    typography: {
      htmlFontSize: 10,
      fontSize: 16,
      body1: {
        color: '#000000'
      },
      allVariants: {
        fontFamily: 'PP Neue Montreal, sans-serif'
      },
      button: {
        textTransform: 'none',
        letterSpacing: 0
      },
      h1: {
        fontSize: '6.4rem',
        fontWeight: 700
      },
      h2: {
        fontSize: '4.8rem',
        fontWeight: 700
      },
      h3: {
        fontSize: '3.2rem',
        fontWeight: 700
      },
      h4: {
        fontSize: '2.4rem',
        fontWeight: 700
      },
      h5: {
        fontSize: '1.8rem',
        fontWeight: 600
      },
      subtitle1: {
        fontSize: '1.6rem',
        fontWeight: 600
      },
      subtitle2: {
        fontSize: '1.5rem',
        fontWeight: 400
      },
      caption: {
        fontSize: '1.6rem',
        fontWeight: 450
      }
    },
    shape: {
      borderRadius: 8
    },
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            color: '#F8F8F8',
            opacity: 0.7
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: dark ? 'grey' : 'white',
            boxShadow: 'none',
            borderRadius: '1.2rem'
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: () => ({
            backgroundColor: '#EBEBEB',
            height: '5.2rem'
          })
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ ownerState, theme: baseTheme }) => ({
            ...(ownerState.size === 'small' && {
              height: '45px'
            }),
            ...(ownerState.size === 'medium' && {
              height: '52px'
            }),
            borderRadius: '10px',

            '& .MuiOutlinedInput-notchedOutline': {
              borderStyle: 'none'
            },
            '& .MuiOutlinedInput-root': {
              border: ownerState.error ? '1px solid #ED725D' : '1px solid transparent'
            },
            '& .MuiInputLabel-root': {
              color: '#000000B8'
            },
            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
              color: '#000000B8',
              marginTop: '15px'
            },
            ...(ownerState.label && {
              '& .MuiInputBase-input': {
                position: 'relative',
                top: '10px'
              }
            }),
            '& .MuiFormHelperText-root.Mui-error': {
              fontSize: '1.4rem',
              color: '#ED725D',
              position: 'relative',
              right: '10px',
              paddingTop: '3px'
            }
          })
        }
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true
        },
        styleOverrides: {
          root: {
            '&:disabled': {
              backgroundColor: '#EBEBEB'
            }
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: '0.8rem',
            '&:hover': {
              backgroundColor: '#BAFF2A'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState, theme: baseTheme }) => ({
            minWidth: 0,
            fontSize: '1.6rem',
            color: '#000000',
            background: '#BAFF2A',
            borderRadius: '1.2rem',
            boxShadow: 'none',
            '&:hover': {
              background: '#BAFF2A'
            },

            ...(ownerState.size === 'small' && {
              padding: `${baseTheme.spacing(0.25)} ${baseTheme.spacing(1.25)}`
            }),
            ...(ownerState.size === 'medium' && {
              padding: `${baseTheme.spacing(1.5)} ${baseTheme.spacing(2)}`
            }),
            ...(ownerState.size === 'large' && {
              padding: `${baseTheme.spacing(1)} ${baseTheme.spacing(4)}`
            })
          })
        }
      },
      MuiSelect: {
        styleOverrides: {
          root: ({ ownerState, theme: baseTheme }) => ({
            ...(ownerState.size === 'small' && {
              height: '4.5rem'
            }),
            ...(ownerState.size === 'medium' && {
              height: '5.2rem'
            }),
            // width: '16rem',
            // height: '36px',
            // borderRadius: '10px',
            // background: '#ffffff',
            background: '#EBEBEB',
            '.MuiSelect-iconOpen': { color: '#000000' },
            '.MuiSelect-icon': { color: '#000000' },
            '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' },
            '&:disabled': {
              cursor: 'not-allowed'
            }
          })
        }
      },
      // MuiMenuItem: {
      //   styleOverrides: {
      //     root: () => ({
      //       background: 'transparent',
      //       width: '205px',
      //       '&.Mui-selected': { background: '#EBEBEB' },
      //       '&.Mui-selected:hover': { background: '#EBEBEB' }
      //     })
      //   }
      // },
      MuiChip: {
        styleOverrides: {
          root: {
            height: 'fit-content',
            textTransform: 'uppercase'
          },
          label: ({ ownerState, theme: baseTheme }) => ({
            ...(ownerState.size === 'medium' && {
              padding: `${baseTheme.spacing(0.5)} ${baseTheme.spacing(1.5)}`,
              fontSize: '1.4rem'
            }),
            ...(ownerState.size === 'small' && {
              padding: `${baseTheme.spacing(0.25)} ${baseTheme.spacing(1)}`,
              fontSize: '1.2rem'
            })
          })
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme: baseTheme }) => ({
            borderRadius: `${baseTheme.spacing(0.5)}`,
            fontSize: '1.3rem',
            fontWeight: 600,
            backgroundColor: `${baseTheme.palette.common.black}`,
            color: `${baseTheme.palette.common.white}`
          }),
          arrow: ({ theme: baseTheme }) => ({
            color: `${baseTheme.palette.common.black}`,
            fontSize: '1rem'
          })
        }
      }
    }
  });
};
