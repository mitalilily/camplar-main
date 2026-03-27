import { alpha, Box, Link, Stack, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { FiEdit2, FiRefreshCcw } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import { useRequestOtp, useVerifyOtp } from '../../hooks/useOTP'
import { CAMPLAR_COLORS } from '../../utils/brand'
import { toast } from '../UI/Toast'
import { AuthActionButton } from './AuthPrimitives'
import { AUTH_COLORS, authInfoPanelSx } from './authTheme'
import { getAuthErrorMessage } from './getAuthErrorMessage'

const OTP_LENGTH = 6
const OTP_RESEND_DELAY_MS = 30000

type OtpFormProps = {
  email: string
  inlineOtp?: string
  onEditEmail: () => void
}

export default function OtpForm({
  email,
  inlineOtp = '',
  onEditEmail,
}: OtpFormProps) {
  const { setTokens, setUserId } = useAuth()
  const navigate = useNavigate()
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [visibleOtp, setVisibleOtp] = useState(inlineOtp)
  const [error, setError] = useState('')
  const [resendEnabled, setResendEnabled] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_DELAY_MS / 1000)

  const { mutate: verifyOtp, isPending: verifying } = useVerifyOtp()
  const { mutate: resendOtp, isPending: resending } = useRequestOtp()

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setVisibleOtp(inlineOtp)
  }, [inlineOtp])

  useEffect(() => {
    setResendEnabled(false)
    setSecondsLeft(OTP_RESEND_DELAY_MS / 1000)

    if (timerRef.current) clearTimeout(timerRef.current)
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)

    countdownIntervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    timerRef.current = setTimeout(() => {
      setResendEnabled(true)
      setSecondsLeft(0)
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }, OTP_RESEND_DELAY_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
    }
  }, [email])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const nextDigits = [...otpDigits]
    nextDigits[index] = value.slice(-1)
    setOtpDigits(nextDigits)
    setError('')

    if (value && index < OTP_LENGTH - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`)
      previousInput?.focus()
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const otp = otpDigits.join('')
    if (otp.length !== OTP_LENGTH) {
      setError(`Enter the full ${OTP_LENGTH}-digit verification code.`)
      return
    }

    setError('')

    verifyOtp(
      { email, otp },
      {
        onSuccess: ({ token, refreshToken, user }) => {
          sessionStorage.setItem('activeEmail', email)
          setUserId(user?.id)
          setTokens(token, refreshToken)
          navigate('/onboarding-questions', { replace: true })
        },
        onError: (err: unknown) => {
          const message = getAuthErrorMessage(err, 'OTP verification failed')
          setError(message)

          if (message.toLowerCase().includes('otp expired')) {
            setResendEnabled(true)
            setSecondsLeft(0)
            if (timerRef.current) {
              clearTimeout(timerRef.current)
              timerRef.current = null
            }
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current)
              countdownIntervalRef.current = null
            }
          }
        },
      },
    )
  }

  const handleResendOtp = useCallback(() => {
    if (!resendEnabled || resending) return

    resendOtp(email.toLowerCase().trim(), {
      onSuccess: (data) => {
        setOtpDigits(Array(OTP_LENGTH).fill(''))
        setError('')
        setResendEnabled(false)
        setSecondsLeft(OTP_RESEND_DELAY_MS / 1000)

        if (typeof data?.otp === 'string') {
          setVisibleOtp(data.otp)
        } else {
          setVisibleOtp('')
        }

        if (timerRef.current) clearTimeout(timerRef.current)
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)

        countdownIntervalRef.current = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev <= 1) {
              clearInterval(countdownIntervalRef.current!)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        timerRef.current = setTimeout(() => {
          setResendEnabled(true)
          setSecondsLeft(0)
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
        }, OTP_RESEND_DELAY_MS)

        toast.open({
          message: 'New verification code generated and shown below.',
          severity: 'success',
          position: { vertical: 'top', horizontal: 'center' },
        })
      },
      onError: (err: unknown) => {
        setError(getAuthErrorMessage(err, 'Failed to resend OTP'))
      },
    })
  }, [email, resendEnabled, resendOtp, resending])

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit} spacing={2.6} width="100%">
      <Box sx={authInfoPanelSx}>
        <Typography sx={{ color: alpha(CAMPLAR_COLORS.text, 0.72), lineHeight: 1.7 }}>
          We generated a 6-digit code for <strong>{email}</strong>.{' '}
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

      {visibleOtp ? (
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
              fontSize: '1.65rem',
              fontWeight: 900,
              letterSpacing: '0.32em',
            }}
          >
            {visibleOtp}
          </Typography>
        </Box>
      ) : null}

      <Stack direction="row" spacing={{ xs: 1, sm: 1.4 }} justifyContent="center">
        {otpDigits.map((digit, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, event)}
            variant="outlined"
            size="small"
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontWeight: 800,
                fontSize: '1.3rem',
                padding: '16px 0',
                color: AUTH_COLORS.primary,
              },
            }}
            sx={{
              width: { xs: 44, sm: 58 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                background: `
                  linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.92) 100%)
                `,
                boxShadow: `0 10px 24px ${alpha(CAMPLAR_COLORS.text, 0.05)}`,
                '& fieldset': {
                  borderColor: digit
                    ? alpha(AUTH_COLORS.primarySoft, 0.7)
                    : alpha(AUTH_COLORS.primary, 0.12),
                  borderWidth: digit ? 2 : 1,
                },
                '&:hover fieldset': {
                  borderColor: alpha(AUTH_COLORS.primarySoft, 0.8),
                },
                '&.Mui-focused fieldset': {
                  borderColor: AUTH_COLORS.primarySoft,
                },
              },
            }}
          />
        ))}
      </Stack>

      {error ? (
        <Typography sx={{ textAlign: 'center', color: AUTH_COLORS.accentDeep, fontWeight: 700 }}>
          {error}
        </Typography>
      ) : null}

      <AuthActionButton
        type="submit"
        text="Verify and Continue"
        loading={verifying}
        loadingText="Verifying..."
        disabled={otpDigits.some((digit) => !digit) || verifying}
      />

      <Box sx={{ textAlign: 'center' }}>
        {resendEnabled ? (
          <AuthActionButton
            type="button"
            variant="secondary"
            onClick={handleResendOtp}
            text="Resend Code"
            loading={resending}
            loadingText="Sending..."
            icon={<FiRefreshCcw size={14} />}
          />
        ) : (
          <Typography sx={{ color: alpha(CAMPLAR_COLORS.text, 0.64), fontWeight: 700 }}>
            Resend available in {secondsLeft}s
          </Typography>
        )}
      </Box>
    </Stack>
  )
}
