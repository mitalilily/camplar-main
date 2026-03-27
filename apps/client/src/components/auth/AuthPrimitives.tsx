import {
  alpha,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  type ButtonProps,
} from '@mui/material'
import {
  useId,
  useState,
  type ChangeEventHandler,
  type FocusEventHandler,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { CAMPLAR_FONTS } from '../../utils/brand'
import { AUTH_COLORS } from './authTheme'

interface AuthActionButtonProps
  extends Omit<ButtonProps, 'children' | 'color' | 'variant'> {
  text: string
  icon?: ReactNode
  loading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary'
}

export function AuthActionButton({
  text,
  icon,
  loading = false,
  loadingText = 'Working...',
  variant = 'primary',
  disabled,
  ...props
}: AuthActionButtonProps) {
  const primary = variant === 'primary'

  return (
    <Button
      fullWidth
      disableElevation
      disabled={disabled || loading}
      sx={{
        minHeight: 56,
        px: 3,
        py: 1.6,
        borderRadius: 4,
        textTransform: 'none',
        fontFamily: CAMPLAR_FONTS.heading,
        fontWeight: 800,
        fontSize: '1rem',
        letterSpacing: '-0.01em',
        color: primary ? '#FFFFFF' : AUTH_COLORS.primary,
        border: primary ? 'none' : `1px solid ${alpha(AUTH_COLORS.primary, 0.12)}`,
        background: primary
          ? `linear-gradient(135deg, ${AUTH_COLORS.accentDeep} 0%, ${AUTH_COLORS.accent} 100%)`
          : `linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.94) 100%)`,
        boxShadow: primary
          ? `0 16px 32px ${alpha(AUTH_COLORS.accent, 0.28)}`
          : `0 10px 24px ${alpha(AUTH_COLORS.text, 0.06)}`,
        '&:hover': {
          background: primary
            ? `linear-gradient(135deg, #913100 0%, #ff6e2f 100%)`
            : `linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(246,250,255,1) 100%)`,
          boxShadow: primary
            ? `0 18px 34px ${alpha(AUTH_COLORS.accent, 0.34)}`
            : `0 12px 26px ${alpha(AUTH_COLORS.text, 0.08)}`,
        },
        '&:disabled': {
          color: primary ? '#FFFFFF' : alpha(AUTH_COLORS.primary, 0.5),
          opacity: 0.68,
        },
      }}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={18} thickness={4.2} sx={{ color: 'currentColor', mr: 1.2 }} />
          <Typography component="span" sx={{ color: 'inherit', fontWeight: 800 }}>
            {loadingText}
          </Typography>
        </>
      ) : (
        <>
          {icon ? <Box sx={{ display: 'inline-flex', mr: 1 }}>{icon}</Box> : null}
          <Typography component="span" sx={{ color: 'inherit', fontWeight: 800 }}>
            {text}
          </Typography>
        </>
      )}
    </Button>
  )
}

interface AuthTextFieldProps {
  id?: string
  name?: string
  label: string
  labelAction?: ReactNode
  type?: 'text' | 'email' | 'password'
  value: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  placeholder?: string
  required?: boolean
  autoFocus?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: ReactNode
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  autoComplete?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
}

export function AuthTextField({
  id,
  name,
  label,
  labelAction,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  autoFocus = false,
  disabled = false,
  error = false,
  helperText,
  startAdornment,
  endAdornment,
  autoComplete,
  inputMode,
}: AuthTextFieldProps) {
  const generatedId = useId()
  const resolvedId = id ?? generatedId
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === 'password'
  const resolvedType = isPasswordField ? (showPassword ? 'text' : 'password') : type
  const resolvedEndAdornment = isPasswordField ? (
    <IconButton
      edge="end"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      sx={{
        color: AUTH_COLORS.muted,
        '&:hover': {
          backgroundColor: alpha(AUTH_COLORS.primary, 0.06),
          color: AUTH_COLORS.primary,
        },
      }}
    >
      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
    </IconButton>
  ) : (
    endAdornment
  )

  return (
    <Box>
      <Box
        sx={{
          mb: 0.95,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.4,
        }}
      >
        <Typography
          component="label"
          htmlFor={resolvedId}
          sx={{
            fontSize: '0.94rem',
            fontWeight: 700,
            color: alpha(AUTH_COLORS.text, 0.78),
            letterSpacing: '-0.01em',
          }}
        >
          {label}
          {required ? (
            <Box component="span" sx={{ color: AUTH_COLORS.accent, ml: 0.45 }}>
              *
            </Box>
          ) : null}
        </Typography>
        {labelAction}
      </Box>

      <TextField
        id={resolvedId}
        name={name}
        fullWidth
        variant="outlined"
        type={resolvedType}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
        helperText={helperText}
        autoComplete={autoComplete}
        inputMode={inputMode}
        slotProps={{
          input: {
            startAdornment: startAdornment ? (
              <InputAdornment position="start">
                <Box sx={{ display: 'inline-flex', color: alpha(AUTH_COLORS.muted, 0.9) }}>
                  {startAdornment}
                </Box>
              </InputAdornment>
            ) : undefined,
            endAdornment: resolvedEndAdornment ? (
              <InputAdornment position="end">{resolvedEndAdornment}</InputAdornment>
            ) : undefined,
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            background: `
              linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.92) 100%)
            `,
            boxShadow: `0 10px 24px ${alpha(AUTH_COLORS.text, 0.06)}`,
            transition: 'all 0.22s ease',
            '& fieldset': {
              borderColor: error ? undefined : alpha(AUTH_COLORS.primary, 0.08),
            },
            '&:hover fieldset': {
              borderColor: error ? undefined : alpha(AUTH_COLORS.primary, 0.18),
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 4px ${alpha(AUTH_COLORS.primarySoft, 0.08)}, 0 14px 30px ${alpha(AUTH_COLORS.text, 0.08)}`,
            },
            '&.Mui-focused fieldset': {
              borderColor: AUTH_COLORS.primarySoft,
            },
          },
          '& .MuiInputBase-input': {
            py: 1.75,
            fontSize: '0.98rem',
            fontWeight: 500,
            color: AUTH_COLORS.text,
          },
          '& .MuiFormHelperText-root': {
            mt: 0.9,
            ml: 0.3,
            fontWeight: 600,
            fontSize: '0.78rem',
          },
        }}
      />
    </Box>
  )
}
