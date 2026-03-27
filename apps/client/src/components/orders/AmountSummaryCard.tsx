import { alpha, Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { FaMoneyBillWave, FaReceipt, FaTruck } from 'react-icons/fa'
import { CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../utils/brand'

interface OrderSummaryProps {
  subtotal: number
  totalOrderValue: number
  totalCollectable: number
  errors?: Record<string, unknown>
  variant?: 'inline' | 'sidebar'
}

const NAVY = CAMPLAR_COLORS.primary
const NAVY_SOFT = CAMPLAR_COLORS.primarySoft
const ORANGE = CAMPLAR_COLORS.secondary
const ORANGE_BRIGHT = CAMPLAR_COLORS.secondaryBright
const TEXT_PRIMARY = CAMPLAR_COLORS.text
const TEXT_SECONDARY = CAMPLAR_COLORS.textMuted

const formatMoney = (value: number) =>
  `Rs. ${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

const summaryRows = (subtotal: number, totalOrderValue: number, totalCollectable: number) => [
  {
    key: 'subtotal',
    label: 'Product Subtotal',
    value: formatMoney(subtotal),
    icon: <FaReceipt size={15} />,
  },
  {
    key: 'orderTotal',
    label: 'Customer Payable',
    value: formatMoney(totalOrderValue),
    icon: <FaTruck size={15} />,
  },
  {
    key: 'collectable',
    label: 'Collectable Amount',
    value: formatMoney(totalCollectable),
    icon: <FaMoneyBillWave size={15} />,
  },
]

const hasFieldError = (errors?: Record<string, unknown>, field?: string) =>
  Boolean(errors && field && errors[field])

export default function AmountSummaryCard({
  subtotal,
  totalOrderValue,
  totalCollectable,
  errors,
  variant = 'inline',
}: OrderSummaryProps) {
  const rows = summaryRows(subtotal, totalOrderValue, totalCollectable)

  if (variant === 'sidebar') {
    return (
      <Paper
        elevation={0}
        sx={{
          position: { lg: 'sticky' },
          top: { lg: 18 },
          overflow: 'hidden',
          borderRadius: 7,
          border: `1px solid ${alpha(NAVY, 0.12)}`,
          background: `
            radial-gradient(circle at 88% 0%, ${alpha(ORANGE_BRIGHT, 0.22)} 0%, transparent 22%),
            radial-gradient(circle at 12% 10%, ${alpha(NAVY_SOFT, 0.18)} 0%, transparent 26%),
            linear-gradient(180deg, rgba(0,11,55,0.98) 0%, rgba(0,29,103,0.94) 100%)
          `,
          color: '#ffffff',
          boxShadow: `0 28px 54px ${alpha(NAVY, 0.3)}`,
        }}
      >
        <Box sx={{ px: 2.7, py: 2.4 }}>
          <Typography
            sx={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: alpha('#ffffff', 0.7),
            }}
          >
            Order Summary
          </Typography>
          <Typography
            sx={{
              mt: 0.7,
              fontFamily: CAMPLAR_FONTS.heading,
              fontSize: '1.55rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
            }}
          >
            Shipment Billing
          </Typography>
          <Typography sx={{ mt: 0.9, color: alpha('#ffffff', 0.76), lineHeight: 1.6 }}>
            Review the seller-facing totals before we move this booking to pickup and courier
            confirmation.
          </Typography>
        </Box>

        <Box
          sx={{
            px: 2.2,
            pb: 2.2,
            pt: 0.8,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 5,
              bgcolor: alpha('#ffffff', 0.08),
              border: `1px solid ${alpha('#ffffff', 0.12)}`,
              backdropFilter: 'blur(12px)',
              px: 2.1,
              py: 1.9,
            }}
          >
            <Stack spacing={1.4}>
              {rows.slice(0, 2).map((row) => (
                <Stack key={row.key} direction="row" justifyContent="space-between" spacing={1.2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ color: alpha('#ffffff', 0.7), display: 'flex' }}>{row.icon}</Box>
                    <Typography sx={{ color: alpha('#ffffff', 0.76), fontSize: '0.92rem' }}>
                      {row.label}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 800 }}>{row.value}</Typography>
                </Stack>
              ))}

              <Divider sx={{ borderColor: alpha('#ffffff', 0.12) }} />

              <Box
                sx={{
                  p: 1.6,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${alpha(ORANGE, 0.22)} 0%, ${alpha(
                    ORANGE_BRIGHT,
                    0.14,
                  )} 100%)`,
                  border: `1px solid ${alpha('#ffffff', 0.14)}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: alpha('#ffffff', 0.76),
                  }}
                >
                  Collectable Total
                </Typography>
                <Typography
                  sx={{
                    mt: 0.55,
                    fontFamily: CAMPLAR_FONTS.heading,
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {formatMoney(totalCollectable)}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.6,
        borderRadius: 5,
        border: `1px solid ${alpha(NAVY, 0.12)}`,
        background: `
          radial-gradient(circle at top right, ${alpha(ORANGE_BRIGHT, 0.12)} 0%, transparent 26%),
          linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.94) 100%)
        `,
        boxShadow: `0 22px 40px ${alpha(TEXT_PRIMARY, 0.06)}`,
      }}
    >
      <Stack spacing={2}>
        <Typography
          sx={{
            fontSize: '0.84rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: TEXT_SECONDARY,
          }}
        >
          Booking Totals
        </Typography>

        {rows.map((row) => {
          const rowHasError =
            row.key === 'subtotal'
              ? hasFieldError(errors, 'products')
              : row.key === 'orderTotal'
              ? hasFieldError(errors, 'totalOrderValue')
              : hasFieldError(errors, 'prepaidAmount')

          return (
            <Stack key={row.key} direction="row" justifyContent="space-between" spacing={1.2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ color: rowHasError ? CAMPLAR_COLORS.danger : NAVY, display: 'flex' }}>
                  {row.icon}
                </Box>
                <Typography
                  sx={{
                    color: rowHasError ? CAMPLAR_COLORS.danger : TEXT_SECONDARY,
                    fontWeight: 700,
                  }}
                >
                  {row.label}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: rowHasError ? CAMPLAR_COLORS.danger : TEXT_PRIMARY,
                  fontWeight: 800,
                }}
              >
                {row.value}
              </Typography>
            </Stack>
          )
        })}

        <Divider sx={{ borderColor: alpha(NAVY, 0.1) }} />

        <Box
          sx={{
            px: 1.8,
            py: 1.6,
            borderRadius: 4,
            border: `1px solid ${alpha(ORANGE, 0.18)}`,
            background: `linear-gradient(135deg, ${alpha(ORANGE, 0.08)} 0%, ${alpha(
              ORANGE_BRIGHT,
              0.06,
            )} 100%)`,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: TEXT_SECONDARY,
            }}
          >
            Ready For Courier Booking
          </Typography>
          <Typography
            sx={{
              mt: 0.6,
              fontFamily: CAMPLAR_FONTS.heading,
              fontSize: '1.5rem',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: TEXT_PRIMARY,
            }}
          >
            {formatMoney(totalCollectable)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}
