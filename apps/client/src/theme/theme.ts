import { alpha, createTheme } from '@mui/material/styles'
import { CAMPLAR_COLORS, CAMPLAR_FONTS } from '../utils/brand'

const BRAND_INK = CAMPLAR_COLORS.primary
const BRAND_INK_LIGHT = '#B7C4FF'
const BRAND_INK_DARK = CAMPLAR_COLORS.primarySoft
const BRAND_CLAY = CAMPLAR_COLORS.secondary
const BRAND_CLAY_LIGHT = CAMPLAR_COLORS.secondarySoft
const BRAND_CLAY_DARK = CAMPLAR_COLORS.secondaryBright
const BACKGROUND = CAMPLAR_COLORS.surface
const SURFACE = CAMPLAR_COLORS.surfaceHighest
const TEXT_PRIMARY = CAMPLAR_COLORS.text
const TEXT_SECONDARY = CAMPLAR_COLORS.textMuted
const TEXT_MUTED = '#8A9AAF'
const BORDER = CAMPLAR_COLORS.outline
const BODY_FONT = CAMPLAR_FONTS.body
const DISPLAY_FONT = CAMPLAR_FONTS.heading

export const BRAND_NAVY = BRAND_INK
export const BRAND_PLUM = BRAND_CLAY
export const BRAND_YELLOW = BRAND_CLAY_DARK
export const BRAND_BLUE = BRAND_INK_LIGHT
export const TEXT = TEXT_SECONDARY
export const BRAND_LIGHT_NAVY = BRAND_INK_LIGHT
export const BRAND_PURPLE = BRAND_PLUM

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    background: {
      default: BACKGROUND,
      paper: SURFACE,
    },
    primary: {
      main: BRAND_INK,
      light: BRAND_INK_LIGHT,
      dark: BRAND_INK_DARK,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: BRAND_CLAY,
      light: BRAND_CLAY_LIGHT,
      dark: BRAND_CLAY_DARK,
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#C45E5E',
      light: '#E48F8F',
      dark: '#963A3A',
    },
    warning: {
      main: '#B86B00',
      light: '#FFD8B6',
      dark: BRAND_CLAY_DARK,
    },
    info: {
      main: BRAND_INK_LIGHT,
      light: '#DCE1FF',
      dark: BRAND_INK,
    },
    success: {
      main: CAMPLAR_COLORS.success,
      light: '#DDF8ED',
      dark: '#0F5A40',
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
      disabled: TEXT_MUTED,
    },
    divider: BORDER,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: BODY_FONT,
    h1: {
      fontFamily: DISPLAY_FONT,
      color: TEXT_PRIMARY,
      fontWeight: 800,
      fontSize: '2.7rem',
      lineHeight: 1.02,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontFamily: DISPLAY_FONT,
      color: TEXT_PRIMARY,
      fontWeight: 800,
      fontSize: '2.2rem',
      lineHeight: 1.06,
      letterSpacing: '-0.04em',
    },
    h3: {
      fontFamily: DISPLAY_FONT,
      color: TEXT_PRIMARY,
      fontWeight: 800,
      fontSize: '1.9rem',
      lineHeight: 1.08,
    },
    h4: {
      fontFamily: DISPLAY_FONT,
      color: TEXT_PRIMARY,
      fontWeight: 800,
      fontSize: '1.55rem',
      lineHeight: 1.12,
    },
    h5: {
      fontFamily: DISPLAY_FONT,
      color: TEXT_PRIMARY,
      fontWeight: 700,
      fontSize: '1.24rem',
      lineHeight: 1.16,
    },
    h6: {
      fontFamily: DISPLAY_FONT,
      color: TEXT_PRIMARY,
      fontWeight: 700,
      fontSize: '1.05rem',
      lineHeight: 1.2,
    },
    subtitle1: {
      color: TEXT_PRIMARY,
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle2: {
      color: TEXT_SECONDARY,
      fontWeight: 600,
      fontSize: '0.86rem',
      letterSpacing: '0.03em',
    },
    body1: {
      color: TEXT_PRIMARY,
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    body2: {
      color: TEXT_SECONDARY,
      fontWeight: 400,
      fontSize: '0.92rem',
      lineHeight: 1.62,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: BACKGROUND,
          backgroundImage:
            'radial-gradient(circle at 10% 6%, rgba(0,29,103,0.12) 0%, transparent 28%), radial-gradient(circle at 92% 4%, rgba(255,94,20,0.12) 0%, transparent 26%), linear-gradient(180deg, #fbfcff 0%, #f7f9ff 52%, #eef5ff 100%)',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          color: TEXT_PRIMARY,
          fontFamily: BODY_FONT,
        },
        '#root': {
          minHeight: '100vh',
        },
        '::selection': {
          backgroundColor: alpha(BRAND_CLAY, 0.18),
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: alpha(SURFACE, 0.92),
          color: TEXT_PRIMARY,
          boxShadow: `0 16px 34px ${alpha(TEXT_PRIMARY, 0.08)}`,
          borderBottom: `1px solid ${alpha(BRAND_INK, 0.08)}`,
          backdropFilter: 'blur(16px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: `0 18px 36px ${alpha(TEXT_PRIMARY, 0.05)}`,
          border: `1px solid ${alpha(BRAND_INK, 0.1)}`,
          backgroundColor: SURFACE,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: SURFACE,
          borderRadius: 24,
        },
        elevation1: {
          boxShadow: `0 12px 26px ${alpha(TEXT_PRIMARY, 0.04)}`,
        },
        elevation4: {
          boxShadow: `0 18px 40px ${alpha(TEXT_PRIMARY, 0.08)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: '10px 22px',
          fontSize: '0.875rem',
          fontWeight: 700,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 12px 28px ${alpha(TEXT_PRIMARY, 0.12)}`,
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${BRAND_INK} 0%, ${BRAND_INK_DARK} 100%)`,
          color: '#FFFFFF',
          boxShadow: `0 10px 24px ${alpha(BRAND_INK, 0.24)}`,
          '&:hover': {
            background: `linear-gradient(135deg, ${BRAND_INK_DARK} 0%, ${BRAND_INK} 100%)`,
            boxShadow: `0 14px 30px ${alpha(BRAND_INK, 0.3)}`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${BRAND_CLAY} 0%, ${BRAND_CLAY_DARK} 100%)`,
          color: '#FFFFFF',
          '&:hover': {
            background: `linear-gradient(135deg, ${BRAND_CLAY_DARK} 0%, ${BRAND_CLAY} 100%)`,
          },
        },
        outlined: {
          borderColor: alpha(BRAND_INK, 0.18),
          color: TEXT_PRIMARY,
          backgroundColor: alpha(CAMPLAR_COLORS.surfaceLow, 0.8),
          '&:hover': {
            borderColor: alpha(BRAND_INK, 0.32),
            backgroundColor: alpha(BRAND_CLAY, 0.07),
          },
        },
        text: {
          color: TEXT_PRIMARY,
          '&:hover': {
            backgroundColor: alpha(BRAND_INK, 0.06),
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: alpha(CAMPLAR_COLORS.surfaceLow, 0.94),
            '& fieldset': {
              borderColor: alpha(BRAND_INK, 0.12),
            },
            '&:hover fieldset': {
              borderColor: alpha(BRAND_INK, 0.24),
            },
            '&.Mui-focused fieldset': {
              borderColor: BRAND_INK,
            },
          },
          '& .MuiInputLabel-root': {
            color: TEXT_SECONDARY,
            fontWeight: 500,
            '&.Mui-focused': {
              color: BRAND_INK,
            },
          },
          '& .MuiOutlinedInput-input': {
            color: TEXT_PRIMARY,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          textDecoration: 'none',
          '&:hover': {
            color: BRAND_CLAY_DARK,
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
        filled: {
          backgroundColor: alpha(BRAND_INK, 0.08),
          color: TEXT_PRIMARY,
        },
        outlined: {
          borderColor: alpha(BRAND_INK, 0.16),
          color: TEXT_PRIMARY,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 28,
          border: `1px solid ${alpha(BRAND_INK, 0.1)}`,
          boxShadow: `0 32px 68px ${alpha(TEXT_PRIMARY, 0.16)}`,
          background: SURFACE,
          overflow: 'hidden',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: TEXT_PRIMARY,
          fontFamily: DISPLAY_FONT,
          fontWeight: 700,
          fontSize: '1.14rem',
          padding: '22px 24px 12px',
          borderBottom: `1px solid ${alpha(BRAND_INK, 0.08)}`,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '18px 24px',
          '&.MuiDialogContent-dividers': {
            borderTop: `1px solid ${alpha(BRAND_INK, 0.08)}`,
            borderBottom: `1px solid ${alpha(BRAND_INK, 0.08)}`,
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '14px 20px',
          borderTop: `1px solid ${alpha(BRAND_INK, 0.08)}`,
          backgroundColor: alpha(BRAND_INK, 0.02),
          gap: 10,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(TEXT_PRIMARY, 0.42),
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
                head: {
          backgroundColor: alpha(BRAND_INK, 0.04),
          color: TEXT_PRIMARY,
          fontWeight: 700,
          borderBottom: `1px solid ${alpha(BRAND_INK, 0.08)}`,
        },
        root: {
          borderBottom: `1px solid ${alpha(BORDER, 0.6)}`,
          color: TEXT_PRIMARY,
        },
      },
    },
  },
})

export default theme
