import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import type { TextFieldProps } from '@mui/material/TextField'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../../utils/brand'

interface CustomInputProps extends Omit<TextFieldProps, 'variant' | 'prefix' | 'postfix'> {
  label?: string
  placeholder?: string
  prefix?: React.ReactNode
  postfix?: React.ReactNode
  required?: boolean
  width?: string | number
  helpText?: string
  topMargin?: boolean
  maxLength?: number
}

const NAVY = CAMPLAR_COLORS.primary
const ORANGE = CAMPLAR_COLORS.secondaryBright
const TEXT = CAMPLAR_COLORS.text
const MUTED = CAMPLAR_COLORS.textMuted

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      value,
      onChange,
      type = 'text',
      label = '',
      placeholder = '',
      prefix,
      postfix,
      required = false,
      helperText,
      width = '100%',
      helpText,
      topMargin = true,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const internalRef = useRef<HTMLInputElement>(null)

    const isPasswordType = type === 'password'

    useEffect(() => {
      if (value) setIsFocused(true)
    }, [value])

    return (
      <Box sx={{ mt: topMargin ? 2 : 0, width }}>
        {label && (
          <Typography
            sx={{
              mb: 0.8,
              fontSize: '0.76rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: isFocused ? NAVY : MUTED,
              fontFamily: CAMPLAR_FONTS.body,
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onClick={() => internalRef.current?.focus()}
          >
            {label}
            {required && <Box component="span" sx={{ ml: 0.5, color: ORANGE }}>*</Box>}
          </Typography>
        )}

        <TextField
          type={isPasswordType && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          helperText={helperText}
          fullWidth
          placeholder={placeholder}
          inputRef={(el) => {
            if (typeof ref === 'function') ref(el)
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el
            internalRef.current = el
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!internalRef.current?.value) setIsFocused(false)
          }}
          sx={{
            width,
            '& .MuiOutlinedInput-root': {
              borderRadius: 5,
              bgcolor: 'rgba(236,244,255,0.92)',
              backgroundImage:
                'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.92) 100%)',
              boxShadow: isFocused
                ? '0 0 0 4px rgba(0,11,55,0.08), 0 14px 26px rgba(0,30,49,0.08)'
                : '0 10px 22px rgba(36,26,27,0.05)',
              transition: 'all 0.2s ease',
              '& fieldset': {
                borderColor: isFocused ? 'rgba(0,11,55,0.28)' : 'rgba(0,11,55,0.12)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0,11,55,0.24)',
              },
            },
            '& .MuiInputBase-input': {
              py: 1.45,
              color: TEXT,
              fontWeight: 600,
              fontSize: '0.95rem',
            },
            '& .MuiFormHelperText-root': {
              ml: 0.3,
              mt: 0.8,
              fontWeight: 600,
            },
          }}
          slotProps={{
            input: {
              startAdornment: prefix ? (
                <InputAdornment position="start">
                  <Box sx={{ display: 'flex', color: NAVY }}>{prefix}</Box>
                </InputAdornment>
              ) : undefined,
              endAdornment: (
                <InputAdornment position="end">
                  {isPasswordType ? (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{
                        color: isFocused ? ORANGE : MUTED,
                        '&:hover': { bgcolor: 'rgba(255,94,20,0.08)' },
                      }}
                    >
                      {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                    </IconButton>
                  ) : (
                    postfix
                  )}
                </InputAdornment>
              ),
            },
            htmlInput: {
              maxLength: maxLength ?? 100,
            },
          }}
          {...props}
        />

        {helpText ? (
          <Box sx={{ mt: 0.8, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                color: MUTED,
                textAlign: 'right',
              }}
            >
              {helpText}
            </Typography>
          </Box>
        ) : null}
      </Box>
    )
  },
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
