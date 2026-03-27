import { alpha, Box, Link, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FiEdit2, FiMail } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import { useVerifyEmailOtp } from '../../hooks/useRequestPasswordLogin'
import { CAMPLAR_COLORS } from '../../utils/brand'
import { toast } from '../UI/Toast'
import { AuthActionButton, AuthTextField } from './AuthPrimitives'
import { AUTH_COLORS, authInfoPanelSx } from './authTheme'
import { getAuthErrorMessage } from './getAuthErrorMessage'

interface EmailVerificationFormProps {
  email: string
  onEditEmail: () => void
  password: string
  resendMail: () => void
  verificationCode?: string
}

export default function EmailVerificationForm({
  email,
  password,
  onEditEmail,
  resendMail,
  verificationCode = '',
}: EmailVerificationFormProps) {
  const { setTokens, setUserId } = useAuth()
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(30)

  const { mutate: verifyEmailOtp, isPending } = useVerifyEmailOtp()

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  useEffect(() => {
    if (verificationCode) {
      setCode('')
      setError('')
      setTouched(false)
    }
  }, [verificationCode])

  const handleSubmit = () => {
    setTouched(true)

    if (!code) {
      setError('Verification code is required.')
      return
    }

    verifyEmailOtp(
      { email, otp: code, password },
      {
        onSuccess: ({ token, refreshToken, user }) => {
          setTokens(token, refreshToken)
          setUserId(user?.id)
          sessionStorage.setItem('activeEmail', email)
          setError('')
          toast.open({
            message: 'Email verified successfully.',
            severity: 'success',
            position: { vertical: 'top', horizontal: 'center' },
          })
          navigate('/onboarding-questions', { replace: true })
        },
        onError: (err: unknown) => {
          setError(getAuthErrorMessage(err, 'Invalid code. Please try again.'))
        },
      },
    )
  }

  const handleResend = () => {
    resendMail()
    setResendCooldown(30)
  }

  return (
    <Stack spacing={2.6} width="100%">
      <Box sx={authInfoPanelSx}>
        <Typography sx={{ color: alpha(CAMPLAR_COLORS.text, 0.72), lineHeight: 1.7 }}>
          Verification code generated for <strong>{email}</strong>.{' '}
          <Link
            component="button"
            underline="hover"
            onClick={onEditEmail}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.45,
              fontWeight: 700,
              color: AUTH_COLORS.primary,
              textUnderlineOffset: 4,
            }}
          >
            <FiEdit2 size={13} />
            Edit
          </Link>
        </Typography>
      </Box>

      {verificationCode ? (
        <Box
          sx={{
            p: 2,
            borderRadius: 4,
            backgroundColor: alpha(AUTH_COLORS.success, 0.08),
            border: `1px solid ${alpha(AUTH_COLORS.success, 0.22)}`,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: AUTH_COLORS.success,
            }}
          >
            Demo Verification Code
          </Typography>
          <Typography
            sx={{
              mt: 0.8,
              color: AUTH_COLORS.primary,
              fontSize: '1.55rem',
              fontWeight: 900,
              letterSpacing: '0.24em',
            }}
          >
            {verificationCode}
          </Typography>
        </Box>
      ) : null}

      <AuthTextField
        id="email-verification-code"
        name="emailVerificationCode"
        label="Verification Code"
        placeholder="Enter the code"
        value={code}
        onChange={(event) => {
          setCode(event.target.value)
          setError('')
        }}
        required
        autoComplete="one-time-code"
        startAdornment={<FiMail size={16} />}
        error={touched && !!error}
        helperText={touched ? error : ''}
      />

      <AuthActionButton
        onClick={handleSubmit}
        text="Verify Email"
        loading={isPending}
        loadingText="Verifying..."
        disabled={!code || isPending}
      />

      <Box sx={{ textAlign: 'center' }}>
        <AuthActionButton
          variant="secondary"
          onClick={handleResend}
          disabled={resendCooldown > 0}
          text={resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : 'Resend Code'}
        />
      </Box>
    </Stack>
  )
}
