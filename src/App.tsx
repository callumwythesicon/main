import type { FormEvent } from 'react'
import { useState } from 'react'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import DomainVerificationRoundedIcon from '@mui/icons-material/DomainVerificationRounded'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const featurePoints = [
  'Centralize financial operations and reporting.',
  'Automate approvals and recurring workflows.',
  'Get real-time visibility across your organization.',
]

function App() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left panel: Project Intacct branding (Figma frame 3897-4577) */}
      <Box
        sx={{
          position: 'relative',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          minWidth: 0,
          px: { md: 8, lg: 12 },
          py: 8,
          background:
            'linear-gradient(145deg, #133C95 0%, #2F5AF3 55%, #638DFD 100%)',
          color: 'common.white',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -160,
            left: -120,
            width: 360,
            height: 360,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.12)',
          }}
        />
        <Stack spacing={5} sx={{ position: 'relative', zIndex: 1, maxWidth: 520 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                width: 44,
                height: 44,
              }}
            >
              <BusinessRoundedIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={700}>
              Project Intacct
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h3" lineHeight={1.15}>
              Welcome to your next ERP workspace.
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Secure access for finance, operations, and leadership teams.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {featurePoints.map((point) => (
              <Stack
                key={point}
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <CheckCircleRoundedIcon sx={{ fontSize: 20, flexShrink: 0 }} />
                <Typography variant="body1" sx={{ opacity: 0.95 }}>
                  {point}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* Right panel: Sign-in form */}
      <Box
        sx={{
          width: { xs: '100%', md: 520 },
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 5 },
          py: { xs: 5, md: 8 },
          bgcolor: 'background.default',
          borderLeft: { md: '1px solid' },
          borderColor: 'divider',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1} textAlign="left">
              <Typography variant="h4" component="h1">
                Sign in
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access your ERP dashboard and continue where you left off.
              </Typography>
            </Stack>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2.25}>
                <TextField
                  required
                  fullWidth
                  label="Work email"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                          onClick={() =>
                            setShowPassword((current) => !current)
                          }
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffRoundedIcon fontSize="small" />
                          ) : (
                            <VisibilityRoundedIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mt: -0.5 }}
                >
                  <FormControlLabel
                    control={<Checkbox size="small" defaultChecked />}
                    label="Remember me"
                  />
                  <Link href="#" underline="hover" variant="body2">
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disableElevation
                >
                  Sign in to dashboard
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<DomainVerificationRoundedIcon />}
                >
                  Continue with SSO
                </Button>
              </Stack>
            </Box>

            <Typography variant="caption" color="text.secondary">
              By continuing, you agree to our terms and privacy policy.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

export default App
