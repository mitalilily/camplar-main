import {
  alpha,
  Box,
  FormControlLabel,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { useEffect, useState, type FormEvent } from 'react'
import { FiMail, FiShield } from 'react-icons/fi'
import { useRequestOtp } from '../../hooks/useOTP'
import { TERMS_AND_CONDITIONS } from '../../utils/constants'
import { CAMPLAR_COLORS } from '../../utils/brand'
import CustomCheckbox from '../UI/inputs/CustomCheckbox'
import CustomModal from '../UI/modal/CustomModal'
import { toast } from '../UI/Toast'
import { AuthActionButton, AuthTextField } from './AuthPrimitives'
import { AUTH_COLORS, authInfoPanelSx } from './authTheme'
import OtpForm from './OtpForm'
import PasswordLoginForm from './PasswordLoginForm'
import { getAuthErrorMessage } from './getAuthErrorMessage'

const resolvePreferredMethod = (): 'phone' | 'password' => {
  const method = sessionStorage.getItem('preferredMethod')
  return method === 'password' ? 'password' : 'phone'
}

export default function PhoneForm() {
  const activeEmail = sessionStorage.getItem('activeEmail')
  const [step, setStep] = useState(0)
  const [preferredLoginMethod, setPreferredLoginMethod] =
    useState<'phone' | 'password'>(resolvePreferredMethod)
  const [email, setEmail] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [termsChecked, setTermsChecked] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)

  const { mutate: sendOtpRequest, isPending } = useRequestOtp()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = email.length > 0 && emailRegex.test(email)

  useEffect(() => {
    if (activeEmail) {
      setEmail(activeEmail)
    }
  }, [activeEmail])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!termsChecked) {
      toast.open({
        message: 'Please accept the Terms and Conditions to continue.',
        severity: 'warning',
        position: { vertical: 'top', horizontal: 'center' },
      })
      return
    }

    setPreferredLoginMethod('phone')
    sessionStorage.setItem('preferredMethod', 'phone')

    sendOtpRequest(email.toLowerCase().trim(), {
      onSuccess: (data) => {
        if (typeof data?.otp === 'string') {
          setGeneratedOtp(data.otp)
          toast.open({
            message: 'Verification code generated and shown below.',
            severity: 'info',
            position: { vertical: 'top', horizontal: 'center' },
          })
        } else {
          setGeneratedOtp('')
        }
        setStep(1)
      },
      onError: (error: unknown) => {
        toast.open({
          message: getAuthErrorMessage(error, 'OTP request failed'),
          severity: 'error',
          position: { vertical: 'top', horizontal: 'center' },
        })
      },
    })
  }

  const termsLabel = (
    <Typography fontSize="0.9rem" color={alpha(CAMPLAR_COLORS.text, 0.7)} lineHeight={1.65}>
      I agree to{' '}
      <Link
        component="button"
        underline="hover"
        onClick={() => setOpenTerms(true)}
        sx={{
          cursor: 'pointer',
          color: AUTH_COLORS.primary,
          fontWeight: 700,
          textUnderlineOffset: 4,
        }}
      >
        Terms and Conditions
      </Link>
    </Typography>
  )

  const renderOtpEntry = () =>
    step === 0 ? (
      <Box component="form" noValidate onSubmit={handleSubmit} width="100%">
        <Stack spacing={2.6}>
          <AuthTextField
            type="email"
            id="otp-email"
            name="email"
            label="Email Address"
            placeholder="name@company.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value.trim())
              setGeneratedOtp('')
            }}
            required
            autoFocus
            autoComplete="email"
            startAdornment={<FiMail size={17} />}
            error={email.length > 0 && !isValidEmail}
            helperText={email.length > 0 && !isValidEmail ? 'Enter a valid email address.' : ''}
          />

          <FormControlLabel
            sx={{ m: 0, alignItems: 'flex-start', gap: 0.5 }}
            control={
              <CustomCheckbox
                checked={termsChecked}
                onChange={(event) => setTermsChecked(event.target.checked)}
                color="primary"
              />
            }
            label={<Box sx={{ pt: 0.35 }}>{termsLabel}</Box>}
          />

          <AuthActionButton
            type="submit"
            text="Send Verification Code"
            loading={isPending}
            loadingText="Sending..."
            disabled={!email || !termsChecked || !isValidEmail || isPending}
          />

          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <FiShield size={13} color={AUTH_COLORS.success} />
            <Typography
              variant="caption"
              sx={{ color: alpha(CAMPLAR_COLORS.text, 0.66), fontWeight: 700 }}
            >
              Codes expire in 30 seconds and can be resent from the next step.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    ) : (
      <OtpForm
        email={email}
        inlineOtp={generatedOtp}
        onEditEmail={() => {
          setGeneratedOtp('')
          setStep(0)
        }}
      />
    )

  return (
    <Stack spacing={2.8}>
      <Box sx={authInfoPanelSx}>
        <Stack direction="row" spacing={1.2} alignItems="flex-start">
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 34,
              height: 34,
              borderRadius: 2.5,
              backgroundColor: alpha(AUTH_COLORS.primarySoft, 0.08),
              color: AUTH_COLORS.primary,
              flexShrink: 0,
            }}
          >
            <FiShield size={16} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, color: AUTH_COLORS.primary, mb: 0.35 }}>
              Secure client authentication
            </Typography>
            <Typography sx={{ color: alpha(CAMPLAR_COLORS.text, 0.7), lineHeight: 1.7 }}>
              Use a one-time passcode for quick access, or switch to password if your account is
              already configured for it.
            </Typography>
          </Box>
        </Stack>
      </Box>

      <ToggleButtonGroup
        value={preferredLoginMethod}
        exclusive
        fullWidth
        onChange={(_, value: 'phone' | 'password' | null) => {
          if (!value) return
          setPreferredLoginMethod(value)
          setStep(0)
          setGeneratedOtp('')
          sessionStorage.setItem('preferredMethod', value)
        }}
        sx={{
          p: 0.5,
          borderRadius: 4,
          backgroundColor: alpha(AUTH_COLORS.primary, 0.04),
          border: `1px solid ${alpha(AUTH_COLORS.primary, 0.08)}`,
          boxShadow: `inset 0 1px 0 ${alpha('#FFFFFF', 0.75)}`,
          '& .MuiToggleButton-root': {
            flex: 1,
            minHeight: 48,
            border: 'none',
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 800,
            color: alpha(CAMPLAR_COLORS.text, 0.54),
            '&.Mui-selected': {
              color: AUTH_COLORS.primary,
              backgroundColor: '#FFFFFF',
              boxShadow: `0 10px 24px ${alpha(CAMPLAR_COLORS.text, 0.08)}`,
            },
            '&.Mui-selected:hover': {
              backgroundColor: '#FFFFFF',
            },
          },
        }}
      >
        <ToggleButton value="phone">One-Time Passcode</ToggleButton>
        <ToggleButton value="password">Email + Password</ToggleButton>
      </ToggleButtonGroup>

      {preferredLoginMethod === 'phone' ? renderOtpEntry() : <PasswordLoginForm onOpenTerms={() => setOpenTerms(true)} />}

      <CustomModal
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        title="Terms and Conditions"
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'pre-line',
            maxHeight: '60vh',
            overflowY: 'auto',
            pr: 1,
          }}
        >
          {TERMS_AND_CONDITIONS}
        </Typography>
      </CustomModal>
    </Stack>
  )
}
