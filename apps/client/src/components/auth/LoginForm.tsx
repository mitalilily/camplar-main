import { useGoogleLogin } from '@react-oauth/google'
import { alpha, Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { FaMicrosoft } from 'react-icons/fa6'
import { type ReactNode } from 'react'
import { FiMail } from 'react-icons/fi'
import { SiGoogle } from 'react-icons/si'
import { TbRoute2, TbShieldCheck, TbWorld } from 'react-icons/tb'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import { useGoogleLoginMutation } from '../../hooks/useOTP'
import { CAMPLAR_BRAND, CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../utils/brand'
import { toast } from '../UI/Toast'
import PhoneForm from './PhoneForm'
import { getAuthErrorMessage } from './getAuthErrorMessage'

const heroStats = [
  { value: '42.8k', label: 'Daily Shipments' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const heroSignals = [
  { label: 'Editorial access flow', icon: <TbShieldCheck size={16} /> },
  { label: 'Real-time visibility', icon: <TbWorld size={16} /> },
  { label: 'One logistics desk', icon: <TbRoute2 size={16} /> },
]

interface SocialButtonProps {
  label: string
  icon: ReactNode
  onClick: () => void
  disabled?: boolean
}

function SocialButton({ label, icon, onClick, disabled = false }: SocialButtonProps) {
  return (
    <Button
      fullWidth
      disabled={disabled}
      onClick={onClick}
      sx={{
        minHeight: 54,
        borderRadius: 4,
        px: 2.2,
        justifyContent: 'center',
        gap: 1.2,
        textTransform: 'none',
        fontWeight: 700,
        fontSize: '0.95rem',
        color: CAMPLAR_COLORS.text,
        border: `1px solid ${alpha(CAMPLAR_COLORS.primary, 0.1)}`,
        background: `
          linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.9) 100%)
        `,
        boxShadow: `0 10px 24px ${alpha(CAMPLAR_COLORS.text, 0.05)}`,
        '&:hover': {
          background: `
            linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(246,250,255,1) 100%)
          `,
          borderColor: alpha(CAMPLAR_COLORS.primarySoft, 0.2),
        },
        '&:disabled': {
          color: alpha(CAMPLAR_COLORS.text, 0.45),
          borderColor: alpha(CAMPLAR_COLORS.primary, 0.06),
        },
      }}
    >
      <Box sx={{ display: 'inline-flex', fontSize: '1rem' }}>{icon}</Box>
      <Typography component="span" sx={{ fontWeight: 700, color: 'inherit' }}>
        {label}
      </Typography>
    </Button>
  )
}

function GoogleAuthButton() {
  const navigate = useNavigate()
  const { setTokens, setUserId } = useAuth()
  const { mutate: googleLogin, isPending } = useGoogleLoginMutation()

  const launchGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: ({ code }) => {
      googleLogin(code, {
        onSuccess: ({ token, refreshToken, user }) => {
          if (user?.email) {
            sessionStorage.setItem('activeEmail', user.email)
          }
          setUserId(user?.id)
          setTokens(token, refreshToken)
          navigate('/onboarding-questions', { replace: true })
        },
        onError: (error: unknown) => {
          toast.open({
            message: getAuthErrorMessage(error, 'Google sign-in failed'),
            severity: 'error',
            position: { vertical: 'top', horizontal: 'center' },
          })
        },
      })
    },
    onError: () => {
      toast.open({
        message: 'Google sign-in was cancelled or could not be started.',
        severity: 'warning',
        position: { vertical: 'top', horizontal: 'center' },
      })
    },
  })

  return (
    <SocialButton
      label={isPending ? 'Connecting...' : 'Google'}
      icon={<SiGoogle />}
      onClick={() => launchGoogle()}
      disabled={isPending}
    />
  )
}

function GoogleButton() {
  const hasGoogleClientId = Boolean(import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID)

  if (hasGoogleClientId) {
    return <GoogleAuthButton />
  }

  return (
    <SocialButton
      label="Google"
      icon={<SiGoogle />}
      onClick={() =>
        toast.open({
          message: 'Google sign-in is not configured for this environment yet.',
          severity: 'info',
          position: { vertical: 'top', horizontal: 'center' },
        })
      }
    />
  )
}

export default function LoginForm() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(960px 340px at 0% 0%, ${alpha(CAMPLAR_COLORS.primarySoft, 0.13)} 0%, transparent 55%),
          radial-gradient(760px 260px at 100% 0%, ${alpha(CAMPLAR_COLORS.secondaryBright, 0.14)} 0%, transparent 52%),
          linear-gradient(180deg, #fbfcff 0%, ${CAMPLAR_COLORS.surface} 45%, #eef5ff 100%)
        `,
        '@keyframes loginHeroFloat': {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.08) translate3d(-2%, -1.5%, 0)' },
        },
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: { md: '48%', lg: '58%' },
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${CAMPLAR_COLORS.primary} 0%, ${CAMPLAR_COLORS.primarySoft} 100%)`,
          }}
        >
          <Box
            component="img"
            src="/images/logistics-bg.png"
            alt="Camplar logistics operations background"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.28,
              animation: 'loginHeroFloat 28s ease-in-out infinite alternate',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(420px 220px at 0% 0%, rgba(255,255,255,0.12) 0%, transparent 70%),
                linear-gradient(180deg, rgba(0,11,55,0.2) 0%, rgba(0,29,103,0.12) 100%)
              `,
            }}
          />

          <Stack
            sx={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              p: { md: 5, lg: 8 },
              justifyContent: 'space-between',
            }}
          >
            <Stack spacing={3.5}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {heroSignals.map((signal) => (
                  <Box
                    key={signal.label}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.8,
                      px: 1.6,
                      py: 0.9,
                      borderRadius: 999,
                      border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                      backgroundColor: alpha('#FFFFFF', 0.08),
                      color: alpha('#FFFFFF', 0.78),
                    }}
                  >
                    <Box sx={{ display: 'inline-flex' }}>{signal.icon}</Box>
                    <Typography sx={{ fontSize: '0.77rem', fontWeight: 700 }}>
                      {signal.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    backgroundColor: '#FFFFFF',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.18)',
                  }}
                >
                  <Box
                    component="img"
                    src={CAMPLAR_BRAND.logoMark}
                    alt={CAMPLAR_BRAND.name}
                    sx={{ width: 30, height: 30 }}
                  />
                </Box>
                <Stack spacing={0.2}>
                  <Typography
                    sx={{
                      fontFamily: CAMPLAR_FONTS.heading,
                      fontWeight: 800,
                      fontSize: '2rem',
                      color: '#FFFFFF',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {CAMPLAR_BRAND.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: alpha('#FFFFFF', 0.62),
                    }}
                  >
                    Global Operations
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={2.2} sx={{ maxWidth: 560 }}>
                <Typography
                  sx={{
                    fontFamily: CAMPLAR_FONTS.heading,
                    fontWeight: 800,
                    fontSize: { md: '3.4rem', lg: '4.25rem' },
                    lineHeight: 0.98,
                    color: '#FFFFFF',
                    letterSpacing: '-0.05em',
                  }}
                >
                  The Kinetic
                  <Box component="span" sx={{ display: 'block', color: alpha('#FFFFFF', 0.84) }}>
                    Navigator.
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 430,
                    fontSize: { md: '1rem', lg: '1.1rem' },
                    lineHeight: 1.8,
                    color: alpha('#FFFFFF', 0.76),
                  }}
                >
                  Streamlining global commerce through intuitive logistics data and real-time
                  shipping narratives.
                </Typography>
              </Stack>

              <Stack
                direction={{ md: 'column', lg: 'row' }}
                spacing={1.6}
                sx={{
                  maxWidth: 480,
                }}
              >
                {heroStats.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      borderRadius: 4,
                      px: 2.4,
                      py: 2,
                      backdropFilter: 'blur(18px)',
                      border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                      backgroundColor: alpha('#FFFFFF', 0.08),
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: CAMPLAR_FONTS.heading,
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#FFB59B',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.8,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        color: alpha('#FFFFFF', 0.54),
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Typography
              sx={{
                fontSize: '0.76rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: alpha('#FFFFFF', 0.42),
              }}
            >
              © 2026 Camplar Kinetic
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            px: { xs: 2.4, sm: 4.5, md: 5, lg: 8 },
            py: { xs: 4.5, sm: 6, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: alpha('#FFFFFF', 0.86),
            backdropFilter: 'blur(16px)',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 5 }}>
              <Box
                component="img"
                src={CAMPLAR_BRAND.logoWordmark}
                alt={CAMPLAR_BRAND.name}
                sx={{ width: 176, maxWidth: '70vw' }}
              />
            </Box>

            <Stack spacing={1.2} mb={4}>
              <Typography
                sx={{
                  fontFamily: CAMPLAR_FONTS.heading,
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.35rem' },
                  color: CAMPLAR_COLORS.primary,
                  letterSpacing: '-0.04em',
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                sx={{
                  color: alpha(CAMPLAR_COLORS.text, 0.68),
                  lineHeight: 1.75,
                  maxWidth: 420,
                }}
              >
                Enter your credentials to access your dashboard.
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mb={3.2}>
              <GoogleButton />
              <SocialButton
                label="Microsoft"
                icon={<FaMicrosoft />}
                onClick={() =>
                  toast.open({
                    message: 'Microsoft sign-in is not connected yet. Use email access for now.',
                    severity: 'info',
                    position: { vertical: 'top', horizontal: 'center' },
                  })
                }
              />
            </Stack>

            <Stack direction="row" spacing={1.8} alignItems="center" mb={3.2}>
              <Divider sx={{ flex: 1, borderColor: alpha(CAMPLAR_COLORS.primary, 0.12) }} />
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: alpha(CAMPLAR_COLORS.textMuted, 0.82),
                }}
              >
                Or continue with
              </Typography>
              <Divider sx={{ flex: 1, borderColor: alpha(CAMPLAR_COLORS.primary, 0.12) }} />
            </Stack>

            <PhoneForm />

            <Typography
              sx={{
                mt: 5,
                textAlign: 'center',
                color: alpha(CAMPLAR_COLORS.text, 0.68),
                fontSize: '0.95rem',
              }}
            >
              Don&apos;t have a client account?
              <Link
                component="a"
                href={`mailto:${CAMPLAR_BRAND.email}?subject=Client%20Account%20Access`}
                sx={{
                  ml: 0.75,
                  color: CAMPLAR_COLORS.secondary,
                  fontWeight: 800,
                  textDecorationColor: alpha(CAMPLAR_COLORS.secondary, 0.4),
                }}
              >
                Contact your agent
              </Link>
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1.2, sm: 3 }}
              sx={{
                mt: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link
                component={RouterLink}
                to="/privacy-policy"
                sx={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: alpha(CAMPLAR_COLORS.textMuted, 0.86),
                }}
              >
                Privacy Policy
              </Link>
              <Link
                component={RouterLink}
                to="/terms-of-service"
                sx={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: alpha(CAMPLAR_COLORS.textMuted, 0.86),
                }}
              >
                Terms of Service
              </Link>
              <Link
                component={RouterLink}
                to="/contact-us"
                sx={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: alpha(CAMPLAR_COLORS.textMuted, 0.86),
                }}
              >
                Support
              </Link>
              <Link
                component="a"
                href={`mailto:${CAMPLAR_BRAND.email}`}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.7,
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: CAMPLAR_COLORS.primary,
                }}
              >
                <FiMail size={14} />
                {CAMPLAR_BRAND.email}
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
