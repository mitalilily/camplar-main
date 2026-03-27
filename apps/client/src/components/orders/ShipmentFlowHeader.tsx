import { alpha, Box, Chip, Paper, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { TbPackageExport } from 'react-icons/tb'
import { CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../utils/brand'

export interface ShipmentFlowStep {
  title: string
  caption: string
}

interface ShipmentFlowHeaderProps {
  modeLabel: string
  title: string
  subtitle: string
  currentStep: number
  steps: ShipmentFlowStep[]
  icon?: ReactNode
}

const SURFACE = CAMPLAR_COLORS.surfaceHighest
const NAVY = CAMPLAR_COLORS.primary
const NAVY_SOFT = CAMPLAR_COLORS.primarySoft
const ORANGE = CAMPLAR_COLORS.secondary
const ORANGE_BRIGHT = CAMPLAR_COLORS.secondaryBright
const TEXT_PRIMARY = CAMPLAR_COLORS.text
const TEXT_SECONDARY = CAMPLAR_COLORS.textMuted

export default function ShipmentFlowHeader({
  modeLabel,
  title,
  subtitle,
  currentStep,
  steps,
  icon = <TbPackageExport size={22} />,
}: ShipmentFlowHeaderProps) {
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <Stack spacing={2.2}>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 7,
          border: `1px solid ${alpha(NAVY, 0.12)}`,
          background: `
            radial-gradient(circle at 8% 0%, ${alpha(NAVY_SOFT, 0.22)} 0%, transparent 28%),
            radial-gradient(circle at 96% 4%, ${alpha(ORANGE_BRIGHT, 0.2)} 0%, transparent 24%),
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.95) 100%)
          `,
          boxShadow: `0 30px 60px ${alpha(TEXT_PRIMARY, 0.08)}`,
          px: { xs: 2.2, sm: 3.1 },
          py: { xs: 2.1, sm: 2.7 },
        }}
      >
        <Stack spacing={2.1} position="relative" zIndex={1}>
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={1.8}
            alignItems={{ xs: 'flex-start', lg: 'center' }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.4} alignItems="center">
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 4.5,
                  display: 'grid',
                  placeItems: 'center',
                  color: SURFACE,
                  background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_BRIGHT} 100%)`,
                  boxShadow: `0 16px 28px ${alpha(ORANGE, 0.22)}`,
                }}
              >
                {icon}
              </Box>
              <Stack spacing={0.55}>
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: TEXT_SECONDARY,
                  }}
                >
                  Camplar Nexus Booking Rail
                </Typography>
                <Typography
                  sx={{
                    fontFamily: CAMPLAR_FONTS.heading,
                    fontSize: { xs: '1.55rem', md: '2rem' },
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    color: TEXT_PRIMARY,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 720,
                    color: TEXT_SECONDARY,
                    fontSize: { xs: '0.92rem', md: '0.98rem' },
                    lineHeight: 1.6,
                  }}
                >
                  {subtitle}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction={{ xs: 'row', sm: 'row' }}
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              alignItems="center"
            >
              <Chip
                label={modeLabel}
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: SURFACE,
                  background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`,
                }}
              />
              <Chip
                label={`Stage ${currentStep + 1} of ${steps.length}`}
                sx={{
                  fontWeight: 700,
                  color: TEXT_PRIMARY,
                  bgcolor: alpha(SURFACE, 0.86),
                  border: `1px solid ${alpha(NAVY, 0.12)}`,
                }}
              />
            </Stack>
          </Stack>

          <Stack spacing={0.8}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                sx={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: TEXT_SECONDARY,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                Booking Progress
              </Typography>
              <Typography sx={{ fontWeight: 800, color: TEXT_PRIMARY }}>
                {Math.round(progress)}%
              </Typography>
            </Stack>
            <Box
              sx={{
                width: '100%',
                height: 10,
                borderRadius: 999,
                overflow: 'hidden',
                bgcolor: alpha(NAVY, 0.08),
                border: `1px solid ${alpha(NAVY, 0.08)}`,
              }}
            >
              <Box
                sx={{
                  width: `${progress}%`,
                  height: '100%',
                  borderRadius: 999,
                  transition: 'width 240ms ease',
                  background: `linear-gradient(90deg, ${ORANGE} 0%, ${ORANGE_BRIGHT} 100%)`,
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.4}>
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <Paper
              key={step.title}
              elevation={0}
              sx={{
                flex: 1,
                px: 2,
                py: 1.65,
                borderRadius: 5,
                border: `1px solid ${
                  isActive
                    ? alpha(ORANGE, 0.22)
                    : isCompleted
                    ? alpha(NAVY, 0.14)
                    : alpha(NAVY, 0.09)
                }`,
                background: isActive
                  ? `linear-gradient(180deg, ${alpha(ORANGE, 0.12)} 0%, rgba(255,255,255,0.98) 100%)`
                  : isCompleted
                  ? `linear-gradient(180deg, ${alpha(NAVY_SOFT, 0.08)} 0%, rgba(255,255,255,0.98) 100%)`
                  : 'rgba(255,255,255,0.88)',
                boxShadow: isActive
                  ? `0 18px 34px ${alpha(ORANGE, 0.12)}`
                  : `0 10px 22px ${alpha(TEXT_PRIMARY, 0.05)}`,
                transition: 'all 220ms ease',
              }}
            >
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    color: isActive || isCompleted ? SURFACE : TEXT_SECONDARY,
                    background: isActive
                      ? `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_BRIGHT} 100%)`
                      : isCompleted
                      ? `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`
                      : alpha(NAVY, 0.08),
                    boxShadow:
                      isActive || isCompleted
                        ? `0 10px 18px ${alpha(TEXT_PRIMARY, 0.12)}`
                        : 'none',
                  }}
                >
                  {index + 1}
                </Box>
                <Stack spacing={0.25}>
                  <Typography sx={{ fontWeight: 800, color: TEXT_PRIMARY }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: TEXT_SECONDARY, lineHeight: 1.45 }}>
                    {step.caption}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          )
        })}
      </Stack>
    </Stack>
  )
}
