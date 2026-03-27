/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, Box, FormControlLabel, Link, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { FiMail, FiShield } from 'react-icons/fi'
import { MdPassword } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import { useRequestPasswordLogin } from '../../hooks/useRequestPasswordLogin'
import { CAMPLAR_BRAND, CAMPLAR_COLORS } from '../../utils/brand'
import CustomCheckbox from '../UI/inputs/CustomCheckbox'
import { toast } from '../UI/Toast'
import { AuthActionButton, AuthTextField } from './AuthPrimitives'
import EmailVerificationForm from './EmailVerificationForm'
import { AUTH_COLORS, authInfoPanelSx } from './authTheme'
import { getAuthErrorMessage } from './getAuthErrorMessage'

interface PasswordLoginFormProps {
  onOpenTerms: () => void
}

export default function PasswordLoginForm({ onOpenTerms }: PasswordLoginFormProps) {
  const { setTokens, setUserId } = useAuth()
  const navigate = useNavigate()
  const { mutate: requestPasswordLogin, isPending } = useRequestPasswordLogin()

  const [step, setStep] = useState(0)
  const [emailForm, setEmailForm] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })
  const [termsChecked, setTermsChecked] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Enter a valid email format.'
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required.'
    if (password.length < 6) return 'Minimum 6 characters required.'
    return ''
  }

  const handleChange = (field: 'email' | 'password', value: string) => {
    setEmailForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'email') {
      setVerificationCode('')
    }

    if (touched[field]) {
      const nextError = field === 'email' ? validateEmail(value) : validatePassword(value)
      setErrors((prev) => ({ ...prev, [field]: nextError }))
    }
  }

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const nextError =
      field === 'email' ? validateEmail(emailForm[field]) : validatePassword(emailForm[field])
    setErrors((prev) => ({ ...prev, [field]: nextError }))
  }

  const isFormValid = !validateEmail(emailForm.email) && !validatePassword(emailForm.password)

  const handleSubmit = () => {
    if (!termsChecked) {
      toast.open({
        message: 'Please accept the Terms and Conditions to continue.',
        severity: 'warning',
        position: { vertical: 'top', horizontal: 'center' },
      })
      return
    }

    const emailError = validateEmail(emailForm.email)
    const passwordError = validatePassword(emailForm.password)

    setErrors({ email: emailError, password: passwordError })
    setTouched({ email: true, password: true })

    if (emailError || passwordError) {
      return
    }

    sessionStorage.setItem('preferredMethod', 'password')

    requestPasswordLogin(
      {
        email: emailForm.email,
        password: emailForm.password,
      },
      {
        onSuccess: ({ message, token, refreshToken, user, verificationToken }) => {
          const inlineVerificationToken =
            typeof verificationToken === 'string' ? verificationToken : undefined

          if (message) {
            toast.open({
              message:
                inlineVerificationToken || message.includes('Verification code generated')
                  ? 'Verification code generated and shown below.'
                  : message,
              severity: 'success',
              position: { vertical: 'top', horizontal: 'center' },
            })
          }

          if (typeof inlineVerificationToken === 'string') {
            setVerificationCode(inlineVerificationToken)
          } else {
            setVerificationCode('')
          }

          if (
            message.includes('Verification email sent') ||
            message.includes('Verification code generated')
          ) {
            setStep(1)
            return
          }

          setUserId(user?.id)
          setTokens(token, refreshToken)
          navigate('/onboarding-questions', { replace: true })
        },
        onError: (error: any) => {
          toast.open({
            message: getAuthErrorMessage(error, 'Something went wrong'),
            severity: 'error',
            position: { vertical: 'top', horizontal: 'center' },
          })
        },
      },
    )
  }

  if (step === 1) {
    return (
      <EmailVerificationForm
        onEditEmail={() => setStep(0)}
        email={emailForm.email}
        resendMail={handleSubmit}
        password={emailForm.password}
        verificationCode={verificationCode}
      />
    )
  }

  return (
    <Stack spacing={2.6}>
      <Box sx={authInfoPanelSx}>
        <Typography sx={{ color: alpha(CAMPLAR_COLORS.text, 0.72), lineHeight: 1.7 }}>
          Enter your registered email and password. If verification is needed, the code will
          appear directly on this screen.
        </Typography>
      </Box>

      <AuthTextField
        type="email"
        id="password-email"
        name="email"
        label="Email Address"
        placeholder="name@company.com"
        value={emailForm.email}
        onChange={(event) => handleChange('email', event.target.value)}
        onBlur={() => handleBlur('email')}
        required
        autoComplete="email"
        startAdornment={<FiMail size={17} />}
        error={touched.email && !!errors.email}
        helperText={touched.email ? errors.email : ''}
      />

      <AuthTextField
        type="password"
        id="password"
        name="password"
        label="Password"
        labelAction={
          <Link
            component="a"
            href={`mailto:${CAMPLAR_BRAND.email}?subject=Password%20Reset%20Request`}
            sx={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: CAMPLAR_COLORS.secondary,
              textUnderlineOffset: 4,
            }}
          >
            Forgot Password?
          </Link>
        }
        placeholder="Enter your password"
        value={emailForm.password}
        onChange={(event) => handleChange('password', event.target.value)}
        onBlur={() => handleBlur('password')}
        required
        autoComplete="current-password"
        startAdornment={<MdPassword size={18} />}
        error={touched.password && !!errors.password}
        helperText={touched.password ? errors.password : ''}
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
        label={
          <Typography
            sx={{
              pt: 0.35,
              fontSize: '0.9rem',
              color: alpha(CAMPLAR_COLORS.text, 0.7),
              lineHeight: 1.65,
            }}
          >
            I agree to{' '}
            <Link
              component="button"
              underline="hover"
              onClick={onOpenTerms}
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
        }
      />

      <AuthActionButton
        type="button"
        text="Sign In"
        loading={isPending}
        loadingText="Signing in..."
        onClick={handleSubmit}
        disabled={!isFormValid || isPending}
      />

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <FiShield size={13} color={AUTH_COLORS.success} />
        <Typography variant="caption" sx={{ color: alpha(CAMPLAR_COLORS.text, 0.66), fontWeight: 700 }}>
          Verification safeguards are applied for suspicious login attempts.
        </Typography>
      </Stack>
    </Stack>
  )
}
