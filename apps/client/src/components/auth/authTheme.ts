import { alpha } from '@mui/material'
import { CAMPLAR_COLORS } from '../../utils/brand'

export const AUTH_COLORS = {
  primary: CAMPLAR_COLORS.primary,
  primarySoft: CAMPLAR_COLORS.primarySoft,
  accent: CAMPLAR_COLORS.secondaryBright,
  accentDeep: CAMPLAR_COLORS.secondary,
  surface: CAMPLAR_COLORS.surface,
  surfaceLow: CAMPLAR_COLORS.surfaceLow,
  text: CAMPLAR_COLORS.text,
  muted: CAMPLAR_COLORS.textMuted,
  line: alpha(CAMPLAR_COLORS.text, 0.12),
  success: CAMPLAR_COLORS.success,
} as const

export const authInfoPanelSx = {
  borderRadius: 4,
  border: `1px solid ${alpha(AUTH_COLORS.primary, 0.08)}`,
  background: `
    radial-gradient(220px 80px at 0% 0%, ${alpha(AUTH_COLORS.primarySoft, 0.08)} 0%, transparent 74%),
    linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.82) 100%)
  `,
  px: 2,
  py: 1.6,
  boxShadow: `0 10px 24px ${alpha(AUTH_COLORS.text, 0.05)}`,
} as const
