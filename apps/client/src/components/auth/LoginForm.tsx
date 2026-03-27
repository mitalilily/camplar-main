import { alpha, Box, Button, Grid, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { TbChartArcs, TbMap2, TbShieldCheck, TbTruckDelivery } from 'react-icons/tb'
import { DoorstepCourierScene, RollingVanScene } from '../branding/AnimatedCourierScene'
import { CAMPLAR_BRAND, CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../utils/brand'
import PhoneForm from './PhoneForm'

const SKY = CAMPLAR_COLORS.primary
const GOLD = '#DCE1FF'
const ORANGE = CAMPLAR_COLORS.secondaryBright
const TEXT = CAMPLAR_COLORS.text
const MUTED = CAMPLAR_COLORS.textMuted
const SURFACE = CAMPLAR_COLORS.surface
const SURFACE_SOFT = '#FBFCFF'
const TYPEFACE = CAMPLAR_FONTS.heading

const chips = ['Editorial login', 'Cleaner hierarchy', 'Smart tracking']
const highlights = [
  { value: '12+', label: 'service lanes covered', icon: <TbTruckDelivery size={16} /> },
  { value: '24/7', label: 'status visibility', icon: <TbMap2 size={16} /> },
  { value: '1', label: 'clean dispatch desk', icon: <TbChartArcs size={16} /> },
]

export default function LoginForm() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(920px 320px at 0% 0%, ${alpha(GOLD, 0.42)} 0%, transparent 58%),
          radial-gradient(760px 260px at 100% 0%, ${alpha(ORANGE, 0.16)} 0%, transparent 52%),
          linear-gradient(180deg, ${SURFACE_SOFT} 0%, ${SURFACE} 100%)
        `,
        px: { xs: 1.5, sm: 2.5, md: 3 },
        py: { xs: 2, sm: 3 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        sx={{
          width: '100%',
          maxWidth: 1220,
          mx: 'auto',
          borderRadius: { xs: 2.5, md: 3.5 },
          overflow: 'hidden',
          backgroundColor: alpha('#FFFDF8', 0.9),
          border: `1px solid ${alpha(SKY, 0.12)}`,
          boxShadow: `0 24px 56px ${alpha(TEXT, 0.1)}`,
          backdropFilter: 'blur(14px)',
          minHeight: { xs: 'auto', md: 700 },
        }}
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
          display: { xs: 'none', md: 'flex' },
          background: `
              radial-gradient(340px 180px at 0% 0%, ${alpha('#FFFFFF', 0.12)} 0%, transparent 74%),
              radial-gradient(260px 160px at 100% 10%, ${alpha(ORANGE, 0.16)} 0%, transparent 70%),
              linear-gradient(180deg, ${alpha(SKY, 0.96)} 0%, ${alpha(CAMPLAR_COLORS.primarySoft, 0.98)} 100%)
            `,
            color: '#ffffff',
            p: { xs: 2.5, md: 4 },
            position: 'relative',
            borderRight: { xs: 'none', md: `1px solid ${alpha(SKY, 0.1)}` },
          }}
        >
          <Stack spacing={3} sx={{ position: 'relative', zIndex: 1, justifyContent: 'center', width: '100%' }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {chips.map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    px: 1.5,
                    py: 0.7,
                    borderRadius: 1.1,
                    border: `1px solid ${alpha('#FFFFFF', 0.14)}`,
                    backgroundColor: alpha('#FFFFFF', 0.08),
                  }}
                >
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: alpha('#ffffff', 0.76), letterSpacing: 0.15 }}>
                    {chip}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Stack direction="row" spacing={1.6} alignItems="center">
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: 3,
                  bgcolor: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box component="img" src={CAMPLAR_BRAND.logoMark} alt={CAMPLAR_BRAND.name} sx={{ width: 28 }} />
              </Box>
              <Stack spacing={0.3}>
                <Typography sx={{ fontFamily: TYPEFACE, fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.04em' }}>
                  {CAMPLAR_BRAND.uppercaseName}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: alpha('#ffffff', 0.72), letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  {CAMPLAR_BRAND.tagLine}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={1} alignItems="flex-start" sx={{ maxWidth: 340 }}>
              <Box
                component={motion.div}
                initial={{ rotate: -14, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                whileHover={{ rotate: 12 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 1.3,
                  bgcolor: alpha('#ffffff', 0.12),
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TbShieldCheck size={20} />
              </Box>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: alpha('#ffffff', 0.78),
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  lineHeight: 1.45,
                  maxWidth: 320,
                }}
              >
                Brand-led access for bookings, tracking, and calmer parcel operations
              </Typography>
              <Typography
                sx={{
                  fontFamily: TYPEFACE,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  fontWeight: 800,
                  color: alpha('#ffffff', 0.92),
                  letterSpacing: '-0.02em',
                }}
              >
                Camplar access for bookings, tracking, and finance visibility.
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontFamily: TYPEFACE,
                fontSize: { xs: '2.1rem', md: '3.35rem' },
                lineHeight: 0.99,
                fontWeight: 800,
                maxWidth: 540,
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
            >
              Navigate courier
              <Box component="span" sx={{ color: alpha('#ffffff', 0.78), display: 'block' }}>
                operations with clearer hierarchy.
              </Box>
            </Typography>

            <Typography sx={{ color: alpha('#ffffff', 0.74), fontSize: '0.95rem', maxWidth: 485, lineHeight: 1.7 }}>
              Camplar keeps daily shipping work lighter with cleaner access, sharper tracking
              visibility, and one branded workspace for every order moving through your panel.
            </Typography>

            <RollingVanScene compact />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              {highlights.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    borderRadius: 1.8,
                    border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                    backgroundColor: alpha('#FFFFFF', 0.08),
                    px: 1.8,
                    py: 1.5,
                    boxShadow: `0 8px 18px ${alpha('#000000', 0.08)}`,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ color: '#ffffff', display: 'flex' }}>{item.icon}</Box>
                    <Typography
                      sx={{
                        fontFamily: TYPEFACE,
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        lineHeight: 1,
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Stack>
                  <Typography sx={{ mt: 0.7, color: alpha('#ffffff', 0.72), fontSize: '0.82rem', lineHeight: 1.55 }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2.4, sm: 3.2, md: 4 },
            background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.94)} 0%, ${alpha('#F8F2EA', 0.92)} 100%)`,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 520, mx: 'auto' }}>
            <Stack spacing={1.2} mb={2.8}>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box
                  component={motion.div}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2.8 }}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 1.15,
                    bgcolor: alpha(SKY, 0.1),
                    color: SKY,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TbTruckDelivery size={18} />
                </Box>
                <Typography sx={{ fontSize: '0.74rem', letterSpacing: 2, fontWeight: 700, color: SKY }}>
                  CAMPLAR ACCESS
                </Typography>
              </Stack>

              <Typography
                variant="h4"
                sx={{
                  fontFamily: TYPEFACE,
                  fontWeight: 800,
                  color: TEXT,
                  lineHeight: 1.06,
                  fontSize: { xs: '1.82rem', sm: '2.18rem' },
                  letterSpacing: '-0.03em',
                }}
              >
                Welcome to Camplar
              </Typography>

              <Typography variant="body2" sx={{ color: MUTED, lineHeight: 1.7, maxWidth: 460 }}>
                Continue with OTP or password to book, track, and manage parcels from one clear
                editorial-style operations desk.
              </Typography>
            </Stack>

            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2.4 }}>
              <DoorstepCourierScene compact />
            </Box>

            <Stack direction="row" spacing={1.2} sx={{ mb: 2.2, flexWrap: 'wrap' }} useFlexGap>
              {['Client demo ready', 'Inline verification', 'Cleaner login'].map((pill) => (
                <Button
                  key={pill}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 1.25,
                    borderColor: alpha(SKY, 0.14),
                    color: TEXT,
                    bgcolor: alpha('#FFFFFF', 0.76),
                    fontWeight: 700,
                    px: 1.5,
                  }}
                >
                  {pill}
                </Button>
              ))}
            </Stack>

            <Box
              sx={{
                borderRadius: 4,
                p: { xs: 1.6, sm: 2.2 },
                border: `1px solid ${alpha(SKY, 0.12)}`,
                background: `
                  radial-gradient(280px 120px at 0% 0%, ${alpha(SKY, 0.05)} 0%, transparent 74%),
                  radial-gradient(220px 100px at 100% 0%, ${alpha(GOLD, 0.08)} 0%, transparent 76%),
                  linear-gradient(180deg, ${alpha('#FFFFFF', 0.98)} 0%, ${alpha(SURFACE, 0.95)} 100%)
                `,
                boxShadow: `0 12px 28px ${alpha(TEXT, 0.065)}`,
              }}
            >
              <PhoneForm />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
