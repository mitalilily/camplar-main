import {
  alpha,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from 'react-icons/tb'
import GlobalSearch from './GlobalSearch'
import QuickActions from './QuickActions'
import UserMenu from './UserMenu'
import WalletMenu from './WalletMenu'
import { CAMPLAR_BRAND, CAMPLAR_COLORS } from '../../utils/brand'

interface NavbarProps {
  handleDrawerToggle: () => void
  pinned: boolean
  name?: string
}

const TEXT_PRIMARY = CAMPLAR_COLORS.text
const TEXT_SECONDARY = CAMPLAR_COLORS.textMuted
const SURFACE = CAMPLAR_COLORS.surfaceHighest
const INK = CAMPLAR_COLORS.primary
const CLAY = CAMPLAR_COLORS.secondaryBright

const sectionLinks = [
  { label: 'Global View', path: '/dashboard' },
  { label: 'Shipments', path: '/orders/list' },
  { label: 'Finance', path: '/billing/invoice_management' },
  { label: 'Support', path: '/support/tickets' },
]

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  home: 'Home',
  orders: 'Shipments',
  list: 'All Shipments',
  create: 'Create Shipment',
  billing: 'Billing',
  invoice_management: 'Invoice Management',
  wallet_transactions: 'Wallet Transactions',
  settings: 'Settings',
  support: 'Support',
  tickets: 'Tickets',
  tools: 'Tools',
  rate_card: 'Rate Card',
  rate_calculator: 'Rate Calculator',
  order_tracking: 'Order Tracking',
  reports: 'Reports',
  couriers: 'Couriers',
  partners: 'Partners',
  profile: 'Profile',
  policies: 'Policies',
  channels: 'Channels',
  reconciliation: 'Reconciliation',
  weight: 'Weight',
}

const getBreadcrumbTrail = (pathname: string) =>
  pathname
    .split('/')
    .filter(Boolean)
    .slice(0, 3)
    .map((segment) => routeLabels[segment] || segment.replace(/[-_]/g, ' '))

export default function Navbar({ handleDrawerToggle, pinned }: NavbarProps) {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const isCompactDesktop = useMediaQuery(theme.breakpoints.down('xl'))
  const showWideDesktopNav = !isCompactDesktop
  const breadcrumbTrail = getBreadcrumbTrail(location.pathname)

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2, md: 2.6 },
        py: { xs: 1.25, md: 1.45 },
        bgcolor: 'transparent',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: (muiTheme) => muiTheme.zIndex.appBar,
        position: 'sticky',
        top: 0,
      }}
    >
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ width: '100%' }}
      >
        <Stack
          direction={isCompactDesktop ? 'column' : 'row'}
          spacing={isCompactDesktop ? 1.1 : 1.4}
          alignItems={isCompactDesktop ? 'stretch' : 'center'}
          justifyContent="space-between"
          sx={{
            width: '100%',
            borderRadius: 8,
            border: `1px solid ${alpha(INK, 0.08)}`,
            backgroundColor: alpha(SURFACE, 0.88),
            backdropFilter: 'blur(16px)',
            boxShadow: `0 18px 34px ${alpha(TEXT_PRIMARY, 0.08)}`,
            px: { xs: 1.2, sm: 1.6, md: 2.1 },
            py: { xs: 1.1, md: 1.25 },
          }}
        >
          <Stack
            direction="row"
            spacing={1.4}
            alignItems="center"
            justifyContent="space-between"
            sx={{ minWidth: 0, width: isCompactDesktop ? '100%' : 'auto' }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center" minWidth={0}>
              <IconButton
                size="small"
                onClick={handleDrawerToggle}
                sx={{
                  bgcolor: alpha(INK, 0.05),
                  borderRadius: 3,
                  border: `1px solid ${alpha(INK, 0.08)}`,
                  color: INK,
                  width: { xs: 38, sm: 42 },
                  height: { xs: 38, sm: 42 },
                  '&:hover': {
                    bgcolor: alpha(INK, 0.08),
                  },
                }}
              >
                {isTablet ? (
                  <TbLayoutSidebarRightCollapseFilled size={18} />
                ) : pinned ? (
                  <TbLayoutSidebarLeftCollapseFilled size={18} />
                ) : (
                  <TbLayoutSidebarRightCollapseFilled size={18} />
                )}
              </IconButton>

              <Box
                sx={{ cursor: 'pointer', minWidth: 0, flex: 1 }}
                onClick={() => navigate('/home')}
              >
                <Stack spacing={0.55} alignItems="flex-start" minWidth={0}>
                  <Box
                    component="img"
                    src={CAMPLAR_BRAND.logoWordmark}
                    alt={CAMPLAR_BRAND.name}
                    sx={{ width: { xs: 148, sm: 194 }, height: 'auto', display: 'block', flexShrink: 0 }}
                  />
                  <Stack
                    direction="row"
                    spacing={0.8}
                    alignItems="center"
                    useFlexGap
                    flexWrap="wrap"
                    sx={{ pl: 0.2 }}
                  >
                    {breadcrumbTrail.length > 0 ? (
                      breadcrumbTrail.map((item, index) => (
                        <Stack key={`${item}-${index}`} direction="row" spacing={0.8} alignItems="center">
                          <Typography
                            sx={{
                              fontSize: '0.68rem',
                              fontWeight: index === breadcrumbTrail.length - 1 ? 800 : 700,
                              letterSpacing: '0.12em',
                              color:
                                index === breadcrumbTrail.length - 1
                                  ? CAMPLAR_COLORS.secondary
                                  : TEXT_SECONDARY,
                              textTransform: 'uppercase',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item}
                          </Typography>
                          {index < breadcrumbTrail.length - 1 && (
                            <Typography sx={{ color: alpha(TEXT_SECONDARY, 0.6), fontSize: '0.74rem' }}>
                              /
                            </Typography>
                          )}
                        </Stack>
                      ))
                    ) : (
                      <Typography
                        sx={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.18em',
                          color: TEXT_SECONDARY,
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {CAMPLAR_BRAND.tagLine}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            {showWideDesktopNav && (
              <Stack
                direction="row"
                spacing={0.6}
                alignItems="center"
                sx={{
                  p: 0.7,
                  borderRadius: 999,
                  border: `1px solid ${alpha(INK, 0.08)}`,
                  backgroundColor: alpha('#ffffff', 0.72),
                  boxShadow: `0 8px 18px ${alpha(TEXT_PRIMARY, 0.04)}`,
                }}
              >
                {sectionLinks.map((link) => {
                  const active = location.pathname.startsWith(link.path.split('?')[0])
                  return (
                    <Button
                      key={link.label}
                      onClick={() => navigate(link.path)}
                      sx={{
                        px: 1.8,
                        py: 0.9,
                        borderRadius: 999,
                        color: active ? INK : TEXT_SECONDARY,
                        backgroundColor: active ? alpha(CLAY, 0.12) : 'transparent',
                        fontWeight: active ? 800 : 700,
                        '&:hover': {
                          backgroundColor: alpha(CLAY, 0.09),
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  )
                })}
              </Stack>
            )}
          </Stack>

          <Stack
            direction="row"
            spacing={{ xs: 0.8, sm: 1.1, md: 1.2 }}
            alignItems="center"
            justifyContent={isCompactDesktop ? 'space-between' : 'flex-end'}
            useFlexGap
            sx={{
              flex: '1 1 auto',
              minWidth: 0,
              flexWrap: 'wrap',
              rowGap: 0.85,
              width: isCompactDesktop ? '100%' : 'auto',
            }}
          >
            {showWideDesktopNav && <GlobalSearch />}

            {showWideDesktopNav && (
              <Chip
                label="Ahmedabad hub"
                sx={{
                  fontWeight: 700,
                  color: TEXT_PRIMARY,
                  bgcolor: alpha(INK, 0.05),
                  border: `1px solid ${alpha(INK, 0.08)}`,
                }}
              />
            )}

            <Button
              variant="contained"
              onClick={() => navigate('/orders/create')}
              sx={{
                background: `linear-gradient(135deg, ${CAMPLAR_COLORS.secondary} 0%, ${CAMPLAR_COLORS.secondaryBright} 100%)`,
                color: '#ffffff',
                minWidth: 'fit-content',
                px: 2.1,
                whiteSpace: 'nowrap',
                '&:hover': {
                  background: `linear-gradient(135deg, ${CAMPLAR_COLORS.secondaryBright} 0%, ${CAMPLAR_COLORS.secondary} 100%)`,
                },
              }}
            >
              Create shipment
            </Button>

            <WalletMenu />
            <QuickActions />
            <UserMenu />
          </Stack>
        </Stack>
      </motion.div>
    </Box>
  )
}
