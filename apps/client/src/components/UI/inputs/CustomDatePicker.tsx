import { Box, Typography } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../../utils/brand'

interface CustomDatePickerProps {
  label?: string
  required?: boolean
  value?: string | Date | null
  onChange?: (e: { target: { value: string } }) => void
  placeholder?: string
  helperText?: string
  width?: string | number
  topMargin?: boolean
  error?: boolean
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label = '',
  required = false,
  value,
  onChange,
  placeholder = '',
  helperText,
  width = '100%',
  topMargin = true,
  error = false,
}) => {
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
            color: CAMPLAR_COLORS.textMuted,
            fontFamily: CAMPLAR_FONTS.body,
          }}
        >
          {label}
          {required && <Box component="span" sx={{ ml: 0.5, color: CAMPLAR_COLORS.secondaryBright }}>*</Box>}
        </Typography>
      )}

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          orientation="landscape"
          value={value ? new Date(value as string) : null}
          onChange={(newValue: Date | null) => {
            if (onChange) {
              const formatted = newValue
                ? newValue.toISOString().split('T')[0] // yyyy-MM-dd
                : ''
              onChange({ target: { value: formatted } })
            }
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                width,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '18px',
                  backgroundColor: 'rgba(236,244,255,0.92)',
                  backgroundImage:
                    'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.92) 100%)',
                  boxShadow: '0 10px 22px rgba(0,30,49,0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(0,11,55,0.12)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0,11,55,0.24)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: CAMPLAR_COLORS.primary,
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '14px 16px',
                  height: 'auto',
                  fontSize: '0.95rem',
                  zIndex: 2,
                  color: CAMPLAR_COLORS.text,
                },
              },
              placeholder,
              helperText,
              error: Boolean(error),
            },
          }}
          enableAccessibleFieldDOMStructure={false} // fix slot error
        />
      </LocalizationProvider>

      {helperText && (
        <Box sx={{ mt: 0.5, textAlign: 'right' }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: CAMPLAR_COLORS.textMuted,
            }}
          >
            {helperText}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default CustomDatePicker
