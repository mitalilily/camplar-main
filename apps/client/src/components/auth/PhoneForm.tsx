import {
  Box,
  Chip,
  FormControlLabel,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useCallback, useEffect, useState } from 'react'
import { FiMail, FiShield } from 'react-icons/fi'
import { useRequestOtp } from '../../hooks/useOTP'
import { CAMPLAR_BRAND } from '../../utils/brand'
import { TERMS_AND_CONDITIONS } from '../../utils/constants'
import { TEXT } from '../../theme/theme'
import CustomIconLoadingButton from '../UI/button/CustomLoadingButton'
import CustomCheckbox from '../UI/inputs/CustomCheckbox'
import CustomInput from '../UI/inputs/CustomInput'
import CustomModal from '../UI/modal/CustomModal'
import { toast } from '../UI/Toast'
import OtpForm from './OtpForm'
import PasswordLoginForm from './PasswordLoginForm'
import { getAuthErrorMessage } from './getAuthErrorMessage'

const DE_BLUE = '#000B37'
const DE_SOFT = '#001D67'
const DE_ORANGE = '#A93800'
const DE_MUTED = '#5F7187'

const primaryButtonStyles = {
  width: '100%',
  borderRadius: 4,
  bgcolor: DE_BLUE,
  boxShadow: `0 8px 24px ${alpha(DE_BLUE, 0.3)}`,
  '&:hover': { bgcolor: DE_SOFT },
}

const secondaryButtonStyles = {
  width: '100%',
  border: `1px solid ${alpha(DE_BLUE, 0.2)}`,
  backgroundColor: alpha(DE_BLUE, 0.04),
  color: DE_BLUE,
  borderRadius: 4,
}

export default function PhoneForm() {
  const activeEmail = sessionStorage.getItem('activeEmail')
  const [step, setStep] = useState<number>(0)
  const [preferredLoginMethod, setPreferredLoginMethod] = useState<'phone' | 'password'>('phone')
  const [email, setEmail] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [termsChecked, setTermsChecked] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)

  const { mutate: sendOtpRequest, isPending } = useRequestOtp()

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setEmail(value)
    setGeneratedOtp('')
  }, [])

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = email.length > 0 && emailRegex.test(email)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          const msg = getAuthErrorMessage(err, 'OTP request failed')
          toast.open({
            message: msg,
            severity: 'error',
            position: { vertical: 'top', horizontal: 'center' },
          })
        },
      })
    },
    [email, termsChecked, sendOtpRequest],
  )

  useEffect(() => {
    if (activeEmail) setEmail(activeEmail)
  }, [activeEmail])

  const termsLabel = (
    <Typography fontSize="13px" display="flex" alignItems="center" gap="3px" color={DE_MUTED}>
      I agree to{' '}
      <Link
        component="button"
        underline="hover"
        onClick={() => setOpenTerms(true)}
        sx={{ cursor: 'pointer', color: DE_BLUE, fontWeight: 700 }}
      >
        Terms and Conditions
      </Link>
    </Typography>
  )

  const renderOtpEntry = () =>
    step === 0 ? (
      <Box component="form" noValidate onSubmit={handleSubmit} width="100%">
        <CustomInput
          type="email"
          label="Work Email"
          value={email}
          name="email"
          id="email"
          onChange={handleEmailChange}
          required
          error={email.length > 0 && !isValidEmail}
          helperText={email.length > 0 && !isValidEmail ? 'Enter a valid email address.' : ''}
          autoFocus
          prefix={<FiMail color={DE_BLUE} size={15} />}
        />

        <FormControlLabel
          sx={{ mt: 1.2, mb: 2.3, alignItems: 'flex-start' }}
          control={
            <CustomCheckbox
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography mt={0.5} variant="body2">
              {termsLabel}
            </Typography>
          }
        />

        <CustomIconLoadingButton
          type="submit"
          styles={primaryButtonStyles}
          textColor="#ffffff"
          disabled={!email || !termsChecked || isPending || !isValidEmail}
          text="Send verification code"
          loading={isPending}
          loadingText="Sending..."
        />
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
    <Stack spacing={2.2} alignItems="stretch">
      <Stack spacing={1.2}>
        <Typography
          sx={{
            fontSize: '0.74rem',
            letterSpacing: '0.18em',
            fontWeight: 800,
            color: DE_ORANGE,
            textTransform: 'uppercase',
          }}
        >
          Secure Access
        </Typography>
        <Typography
          sx={{
            fontSize: '1.35rem',
            fontWeight: 850,
            color: DE_BLUE,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}
        >
          Sign in with your work email
        </Typography>
        <Typography variant="body2" sx={{ color: DE_MUTED, lineHeight: 1.7, fontWeight: 500 }}>
          Continue with inline OTP or password login. Local demo verification codes are surfaced
          directly in the panel when generated.
        </Typography>

        <Chip
          icon={<FiShield size={14} />}
          label="Inline verification enabled"
          size="small"
          sx={{
            alignSelf: 'flex-start',
            mt: 0.2,
            backgroundColor: alpha(DE_ORANGE, 0.08),
            color: DE_ORANGE,
            fontWeight: 700,
            borderRadius: 999,
            '& .MuiChip-icon': { color: DE_ORANGE },
          }}
        />
      </Stack>

      <ToggleButtonGroup
        value={preferredLoginMethod}
        exclusive
        onChange={(_, value) => {
          if (!value) return
          setPreferredLoginMethod(value)
          setStep(0)
        }}
        fullWidth
        sx={{
          p: 0.5,
          borderRadius: 3,
          backgroundColor: alpha(DE_BLUE, 0.04),
          border: `1px solid ${alpha(DE_BLUE, 0.08)}`,
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            fontWeight: 800,
            border: 'none',
            borderRadius: 2.4,
            color: alpha(TEXT, 0.6),
            '&.Mui-selected': {
              backgroundColor: '#FFFFFF',
              color: DE_BLUE,
              boxShadow: `0 10px 22px ${alpha(DE_BLUE, 0.12)}`,
              '&:hover': {
                backgroundColor: '#FFFFFF',
              },
            },
          },
        }}
      >
        <ToggleButton value="phone">One-Time Passcode</ToggleButton>
        <ToggleButton value="password">Email + Password</ToggleButton>
      </ToggleButtonGroup>

      {preferredLoginMethod === 'phone' ? (
        renderOtpEntry()
      ) : (
        <PasswordLoginForm step={step} setOpenTerms={setOpenTerms} setStep={setStep} />
      )}

      <CustomIconLoadingButton
        styles={secondaryButtonStyles}
        onClick={() => setOpenTerms(true)}
        variant="text"
        text="View terms and policies"
      />

      <Typography sx={{ color: alpha(DE_MUTED, 0.9), fontSize: '0.78rem', textAlign: 'center', lineHeight: 1.7 }}>
        Support contact: {CAMPLAR_BRAND.email}
      </Typography>

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
