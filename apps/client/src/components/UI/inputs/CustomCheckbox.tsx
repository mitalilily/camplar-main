import { Box } from '@mui/material'
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox'
import { CAMPLAR_COLORS } from '../../../utils/brand'

// Improved tick SVG with animation - extends outside box
const CustomTick = ({ checked }: { checked?: boolean }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={CAMPLAR_COLORS.secondaryBright}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: checked ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)',
      pointerEvents: 'none',
      opacity: checked ? 1 : 0,
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
  >
    <polyline points="4 12 9 17 20 6" />
  </svg>
)

export default function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      {...props}
      disableRipple={false}
      color="primary"
      icon={
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '6px',
            border: `2px solid ${CAMPLAR_COLORS.outline}`,
            boxSizing: 'border-box',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: CAMPLAR_COLORS.primary,
              boxShadow: '0 0 0 3px rgba(0, 11, 55, 0.08)',
            },
          }}
        />
      }
      checkedIcon={
        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: '6px',
            border: `2px solid ${CAMPLAR_COLORS.primary}`,
            boxSizing: 'border-box',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#FFFFFF', // White background when checked
            transition: 'all 0.2s ease',
            overflow: 'visible', // Allow tick to extend outside
            '&:hover': {
              borderColor: CAMPLAR_COLORS.primarySoft,
              boxShadow: '0 0 0 3px rgba(0, 11, 55, 0.12)',
            },
          }}
        >
          <CustomTick checked />
        </Box>
      }
      sx={{
        padding: '8px',
        overflow: 'visible', // Allow tick to extend outside checkbox area
        '&:hover': {
          backgroundColor: 'rgba(0, 11, 55, 0.04)',
        },
        '&.Mui-focusVisible': {
          outline: `2px solid ${CAMPLAR_COLORS.primary}`,
          outlineOffset: '2px',
          borderRadius: '4px',
        },
        '& .MuiTouchRipple-root': {
          color: 'rgba(0, 11, 55, 0.3)',
        },
        '& svg': {
          overflow: 'visible', // Ensure SVG tick can extend beyond bounds
        },
      }}
    />
  )
}
