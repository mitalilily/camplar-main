import { alpha, Box, Grid, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { TbMap2, TbShieldCheck, TbSparkles, TbTruckDelivery } from 'react-icons/tb'
import { DoorstepCourierScene, RollingVanScene } from '../branding/AnimatedCourierScene'
import { CAMPLAR_BRAND, CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../utils/brand'
import PhoneForm from './PhoneForm'

const NAVY = CAMPLAR_COLORS.primary
const NAVY_SOFT = CAMPLAR_COLORS.primarySoft
const ORANGE = CAMPLAR_COLORS.secondaryBright
const ORANGE_DEEP = CAMPLAR_COLORS.secondary
const SURFACE = CAMPLAR_COLORS.surface
const SURFACE_LOW = CAMPLAR_COLORS.surfaceLow
const TEXT = CAMPLAR_COLORS.text
const MUTED = CAMPLAR_COLORS.textMuted
const TYPEFACE = CAMPLAR_FONTS.heading
const currentYear = new Date().getFullYear()

const featureCards = [
  {
    title: 'Real-time Velocity',
    text: 'Instant updates across every order, courier lane, and delivery touchpoint.',
    icon: <TbTruckDelivery size={18} />,
  },
  {
    title: 'Enterprise Security',
    text: 'Inline verification and controlled access for daily logistics operations.',
    icon: <TbShieldCheck size={18} />,
  },
]

export default function LoginForm() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: SURFACE,
        background: `
          radial-gradient(720px 280px at 0% 0%, ${alpha(CAMPLAR_COLORS.surfaceHigh, 0.88)} 0%, transparent 58%),
          radial-gradient(560px 240px at 100% 0%, ${alpha(ORANGE, 0.11)} 0%, transparent 44%),
          linear-gradient(180deg, ${alpha('#FFFFFF', 0.96)} 0%, ${SURFACE} 100%)
        `,
      }}
    >
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'relative',
            overflow: 'hidden',
            color: '#ffffff',
            background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`,
            px: { md: 5, lg: 7 },
            py: { md: 5, lg: 6 },
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.22,
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-12%',
                right: '-14%',
                width: 420,
                height: 420,
                borderRadius: '50%',
                bgcolor: alpha(ORANGE_DEEP, 0.9),
                filter: 'blur(100px)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: 320,
                height: 320,
                borderRadius: '50%',
                bgcolor: alpha('#FFFFFF', 0.18),
                filter: 'blur(90px)',
              }}
            />
          </Box>

          <Stack spacing={5} sx={{ position: 'relative', zIndex: 1 }}>
            <Stack direction="row" spacing={1.6} alignItems="center">
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2.5,
                  bgcolor: alpha(ORANGE_DEEP, 0.92),
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: `0 18px 42px ${alpha(ORANGE_DEEP, 0.26)}`,
                }}
              >
                <Box component="img" src={CAMPLAR_BRAND.logoMark} alt={CAMPLAR_BRAND.name} sx={{ width: 24 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: TYPEFACE,
                  fontSize: '2rem',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                }}
              >
                {CAMPLAR_BRAND.name}
              </Typography>
            </Stack>

            <Box sx={{ maxWidth: 560 }}>
              <Typography
                sx={{
                  fontFamily: TYPEFACE,
                  fontSize: { md: '3.1rem', lg: '4rem' },
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: '-0.05em',
                  mb: 2.2,
                }}
              >
                Navigate global logistics
                <Box component="span" sx={{ display: 'block', color: alpha('#FFFFFF', 0.74) }}>
                  with kinetic precision.
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: alpha('#FFFFFF', 0.74),
                  fontSize: '1.02rem',
                  lineHeight: 1.8,
                  maxWidth: 500,
                }}
              >
                Join enterprise shipping teams using Camplar to monitor dispatch, track delivery
                movement, and manage daily logistics from one refined operations workspace.
              </Typography>
            </Box>

            <RollingVanScene compact />

            <Grid container spacing={2}>
              {featureCards.map((card) => (
                <Grid key={card.title} size={{ xs: 12, lg: 6 }}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      px: 2.5,
                      py: 2.4,
                      border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                      backgroundColor: alpha('#FFFFFF', 0.1),
                      backdropFilter: 'blur(22px)',
                    }}
                  >
                    <Box sx={{ color: alpha('#FFDBCF', 0.96), mb: 1.3, display: 'inline-flex' }}>
                      {card.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1rem', mb: 0.6 }}>
                      {card.title}
                    </Typography>
                    <Typography sx={{ color: alpha('#FFFFFF', 0.66), fontSize: '0.84rem', lineHeight: 1.7 }}>
                      {card.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Typography
            sx={{
              position: 'relative',
              zIndex: 1,
              color: alpha('#FFFFFF', 0.42),
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              mt: 3,
            }}
          >
            © {currentYear} Camplar Kinetic. All rights reserved.
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2.5, sm: 4, md: 5, lg: 7 },
            py: { xs: 4.5, sm: 5.5, md: 6 },
            bgcolor: alpha('#FFFFFF', 0.82),
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 540 }}>
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4.5 }}>
              <Stack direction="row" spacing={1.4} alignItems="center" mb={2.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: ORANGE_DEEP,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Box component="img" src={CAMPLAR_BRAND.logoMark} alt={CAMPLAR_BRAND.name} sx={{ width: 20 }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: TYPEFACE,
                    fontWeight: 900,
                    fontSize: '1.55rem',
                    color: NAVY,
                    letterSpacing: '-0.05em',
                  }}
                >
                  {CAMPLAR_BRAND.name}
                </Typography>
              </Stack>
              <DoorstepCourierScene compact />
            </Box>

            <Stack spacing={1.5} mb={3.2}>
              <Stack direction="row" spacing={1.1} alignItems="center">
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    bgcolor: alpha(ORANGE_DEEP, 0.1),
                    color: ORANGE_DEEP,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <TbSparkles size={18} />
                </Box>
                <Typography
                  sx={{
                    color: ORANGE_DEEP,
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Client Sign In
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontFamily: TYPEFACE,
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  fontWeight: 900,
                  color: NAVY,
                  letterSpacing: '-0.05em',
                  lineHeight: 1.02,
                }}
              >
                Welcome Back
              </Typography>

              <Typography sx={{ color: MUTED, lineHeight: 1.8, maxWidth: 460 }}>
                Sign in with one-time passcode or password to access your Camplar dashboard,
                manage shipments, and keep every parcel lane in motion.
              </Typography>

              <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap">
                {[
                  { label: 'Live ops access', icon: <TbTruckDelivery size={15} /> },
                  { label: 'Inline verification', icon: <TbShieldCheck size={15} /> },
                  { label: 'Global visibility', icon: <TbMap2 size={15} /> },
                ].map((pill) => (
                  <Box
                    key={pill.label}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.9,
                      px: 1.6,
                      py: 1,
                      borderRadius: 999,
                      bgcolor: alpha(SURFACE_LOW, 0.95),
                      border: `1px solid ${alpha(NAVY, 0.08)}`,
                      color: TEXT,
                    }}
                  >
                    <Box sx={{ color: ORANGE_DEEP, display: 'flex' }}>{pill.icon}</Box>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700 }}>{pill.label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Box
              sx={{
                borderRadius: 5,
                p: { xs: 2.1, sm: 2.8 },
                border: `1px solid ${alpha(NAVY, 0.1)}`,
                background: `
                  radial-gradient(260px 120px at 0% 0%, ${alpha(CAMPLAR_COLORS.surfaceHigh, 0.68)} 0%, transparent 76%),
                  radial-gradient(220px 120px at 100% 0%, ${alpha(ORANGE, 0.11)} 0%, transparent 74%),
                  linear-gradient(180deg, ${alpha('#FFFFFF', 0.98)} 0%, ${alpha(SURFACE, 0.95)} 100%)
                `,
                boxShadow: `0 20px 48px ${alpha(TEXT, 0.08)}`,
              }}
            >
              <PhoneForm />
            </Box>

            <Typography
              sx={{
                mt: 3,
                color: alpha(MUTED, 0.82),
                fontSize: '0.72rem',
                lineHeight: 1.8,
                textAlign: 'center',
              }}
            >
              Secure client access for Camplar shipping operations. Need help? {CAMPLAR_BRAND.email}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
