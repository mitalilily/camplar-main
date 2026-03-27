import {
  alpha,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { BiInfoCircle, BiListPlus } from 'react-icons/bi'
import { CgTrack } from 'react-icons/cg'
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { FaClipboardList as FaFileAlt, FaMoneyBill, FaToolbox } from 'react-icons/fa6'
import { HiDocumentReport } from 'react-icons/hi'
import {
  MdAccountBalanceWallet,
  MdDashboard,
  MdExpandMore,
  MdHelp,
  MdHome,
  MdKeyboardReturn,
  MdOutlineAddBusiness,
  MdOutlineRateReview,
  MdShoppingCart,
  MdSyncAlt,
  MdSyncProblem,
} from 'react-icons/md'
import { RiSettings2Fill } from 'react-icons/ri'
import { TbInvoice, TbReportAnalytics, TbTransactionRupee } from 'react-icons/tb'
import { NavLink, useLocation } from 'react-router-dom'

import type { JSX } from '@emotion/react/jsx-runtime'
import { DRAWER_WIDTH } from '../../utils/constants'
import { isActive } from '../../utils/functions'
import { CAMPLAR_BRAND, CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../utils/brand'

const TEXT_SECONDARY = 'rgba(255,255,255,0.72)'
const SKY = CAMPLAR_COLORS.primary
const ORANGE = CAMPLAR_COLORS.secondary

export type Role = 'customer' | 'admin'

export interface SubItem {
  text: string
  path: string
  icon?: JSX.Element
}

export interface NavItem {
  text: string
  icon: JSX.Element
  path: string
  roles: Role[]
  children?: SubItem[]
}

interface SidebarProps {
  role?: Role
  pinned: boolean
  handleDrawerToggle: () => void
  setHovered: Dispatch<SetStateAction<boolean>>
  hovered: boolean
}

export const COLLAPSED_WIDTH = 80

const STANDARD_ICON_SIZE = 19
const navItems: NavItem[] = [
  { text: 'Home', icon: <MdHome size={STANDARD_ICON_SIZE} />, path: '/home', roles: ['customer', 'admin'] },
  { text: 'Dashboard', icon: <MdDashboard size={STANDARD_ICON_SIZE} />, path: '/dashboard', roles: ['customer', 'admin'] },
  {
    text: 'Shipment Control',
    icon: <MdShoppingCart size={STANDARD_ICON_SIZE} />,
    path: '/orders',
    roles: ['customer', 'admin'],
    children: [
      { text: 'All Shipments', path: '/orders/list', icon: <FaFileAlt size={STANDARD_ICON_SIZE} /> },
      { text: 'B2C Shipments', path: '/orders/b2c/list', icon: <MdOutlineAddBusiness size={STANDARD_ICON_SIZE} /> },
      { text: 'B2B Shipments', path: '/orders/b2b/list', icon: <MdOutlineAddBusiness size={STANDARD_ICON_SIZE} /> },
      { text: 'Create Shipment', path: '/orders/create', icon: <BiListPlus size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Operations',
    icon: <MdSyncAlt size={STANDARD_ICON_SIZE} />,
    path: '/ops',
    roles: ['customer', 'admin'],
    children: [
      { text: 'NDR', path: '/ops/ndr', icon: <MdSyncProblem size={STANDARD_ICON_SIZE} /> },
      { text: 'RTO', path: '/ops/rto', icon: <MdKeyboardReturn size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Finance Desk',
    icon: <FaMoneyBill size={STANDARD_ICON_SIZE} />,
    path: '/billing',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Wallet Transactions', path: '/billing/wallet_transactions', icon: <TbTransactionRupee size={STANDARD_ICON_SIZE} /> },
      { text: 'COD Remittance', path: '/cod-remittance', icon: <MdAccountBalanceWallet size={STANDARD_ICON_SIZE} /> },
      { text: 'Invoice', path: '/billing/invoice_management', icon: <TbInvoice size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Reconciliation',
    icon: <FaBalanceScaleLeft size={STANDARD_ICON_SIZE} />,
    path: '/reconciliation',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Weight', path: '/reconciliation/weight', icon: <FaBalanceScaleLeft size={STANDARD_ICON_SIZE} /> },
      { text: 'Weight Settings', path: '/reconciliation/weight/settings', icon: <RiSettings2Fill size={STANDARD_ICON_SIZE} /> },
    ],
  },
  {
    text: 'Tools',
    icon: <FaToolbox size={STANDARD_ICON_SIZE} />,
    path: '/tools',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Rate Card', path: '/tools/rate_card', icon: <MdOutlineRateReview size={STANDARD_ICON_SIZE} /> },
      { text: 'Rate Calculator', path: '/tools/rate_calculator', icon: <TbReportAnalytics size={STANDARD_ICON_SIZE} /> },
      { text: 'Order Tracking', path: '/tools/order_tracking', icon: <CgTrack size={STANDARD_ICON_SIZE} /> },
    ],
  },
  { text: 'Reports', icon: <HiDocumentReport size={STANDARD_ICON_SIZE} />, path: '/reports', roles: ['customer', 'admin'] },
  { text: 'Settings', icon: <RiSettings2Fill size={STANDARD_ICON_SIZE} />, path: '/settings', roles: ['customer', 'admin'] },
  {
    text: 'Help Center',
    icon: <MdHelp size={STANDARD_ICON_SIZE} />,
    path: '/support',
    roles: ['customer', 'admin'],
    children: [
      { text: 'Raise Ticket', path: '/support/tickets', icon: <BiListPlus size={STANDARD_ICON_SIZE} /> },
      { text: 'About Us', path: '/support/about_us', icon: <BiInfoCircle size={STANDARD_ICON_SIZE} /> },
    ],
  },
]

const navGroups = [
  { label: 'Overview', items: ['Home', 'Dashboard'] },
  { label: 'Shipments', items: ['Shipment Control', 'Operations', 'Reconciliation'] },
  { label: 'Revenue', items: ['Finance Desk', 'Tools', 'Reports'] },
  { label: 'Support', items: ['Settings', 'Help Center'] },
]

export default function Sidebar({
  role = 'customer',
  pinned,
  hovered,
  setHovered,
}: SidebarProps) {
  const location = useLocation()
  const theme = useTheme()
  const isSidebarExpanded = pinned || hovered

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!isSidebarExpanded) setExpandedItems({})
  }, [isSidebarExpanded])

  const toggleExpand = (key: string) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const activeItemSx = {
    bgcolor: alpha('#ffffff', 0.08),
    color: '#ffffff',
    '& .MuiListItemIcon-root': { color: '#ffffff' },
    '& .MuiListItemText-primary': { fontWeight: 800 },
    position: 'relative',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.16)',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '12%',
      height: '76%',
      width: '4px',
      bgcolor: ORANGE,
      borderRadius: '0 6px 6px 0',
    },
  }

  const navItemSx = {
    mx: 0,
    my: 0.45,
    borderRadius: 3.5,
    py: 1,
    px: 1.6,
    color: TEXT_SECONDARY,
    border: `1px solid transparent`,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      bgcolor: alpha('#ffffff', 0.06),
      color: '#ffffff',
      borderColor: alpha('#ffffff', 0.08),
      '& .MuiListItemIcon-root': { color: '#ffffff' },
    },
  }

  const renderNavList = (items: NavItem[]) => (
    <List disablePadding>
      {items.map((item) => {
        const isSelected = isActive(location.pathname, item.path)
        const hasChildren = Boolean(item.children?.length)
        const isExpanded = expandedItems[item.text]
        const childSelected = Boolean(item.children?.some((sub) => isActive(location.pathname, sub.path)))
        const showExpanded = isSidebarExpanded && isExpanded

        return (
          <Box key={item.text}>
            <ListItemButton
              component={hasChildren ? 'div' : NavLink}
              to={hasChildren ? undefined : item.path}
              onClick={hasChildren ? () => toggleExpand(item.text) : undefined}
              sx={{
                ...navItemSx,
                justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
                px: isSidebarExpanded ? 1.6 : 1.1,
                ...(isSelected && !hasChildren ? activeItemSx : {}),
                ...(hasChildren && childSelected
                  ? {
                      bgcolor: alpha('#ffffff', 0.06),
                      color: '#ffffff',
                      '& .MuiListItemIcon-root': { color: '#ffffff' },
                    }
                  : {}),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: isSidebarExpanded ? 40 : 0,
                  justifyContent: 'center',
                  color: isSelected || childSelected ? '#ffffff' : 'inherit',
                  transition: 'color 0.2s',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isSidebarExpanded ? (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.88rem',
                    fontWeight: isSelected || childSelected ? 800 : 600,
                    letterSpacing: '-0.01em',
                  }}
                />
              ) : null}
              {hasChildren && isSidebarExpanded ? (
                <MdExpandMore
                  style={{
                    transform: showExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s',
                    color: showExpanded ? '#ffffff' : 'inherit',
                  }}
                />
              ) : null}
            </ListItemButton>

            {hasChildren && isSidebarExpanded && (
              <Collapse in={showExpanded} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ ml: 4.5, mt: 0.5, mb: 1 }}>
                  {item.children?.map((sub) => {
                    const subActive = isActive(location.pathname, sub.path)
                    return (
                      <ListItemButton
                        key={sub.text}
                        component={NavLink}
                        to={sub.path}
                        sx={{
                          py: 0.7,
                          px: 1.5,
                          borderRadius: 2.5,
                          color: subActive ? '#ffffff' : alpha('#ffffff', 0.72),
                          bgcolor: subActive ? alpha('#ffffff', 0.08) : 'transparent',
                          '&:hover': {
                            bgcolor: alpha('#ffffff', 0.06),
                            color: '#ffffff',
                          },
                          mb: 0.4,
                        }}
                      >
                        <ListItemText
                          primary={sub.text}
                          primaryTypographyProps={{
                            fontSize: '0.82rem',
                            fontWeight: subActive ? 800 : 500,
                          }}
                        />
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
            )}
          </Box>
        )
      })}
    </List>
  )

  return (
    <Box
      sx={{
        width: isSidebarExpanded ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        height: '100vh',
        bgcolor: SKY,
        backgroundImage:
          'radial-gradient(circle at 18% 6%, rgba(255,94,20,0.18) 0%, transparent 28%), radial-gradient(circle at 84% 12%, rgba(149,165,178,0.18) 0%, transparent 28%), linear-gradient(180deg, rgba(0,11,55,0.98) 0%, rgba(0,29,103,0.94) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: theme.zIndex.drawer,
        position: 'fixed',
        left: 0,
        top: 0,
        overflowX: 'hidden',
        boxShadow: '18px 0 42px rgba(0, 11, 55, 0.22)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{ p: 2, mb: 1.2 }}>
        <Box
          sx={{
            p: isSidebarExpanded ? 2.2 : 1.1,
            borderRadius: 5,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
            color: '#ffffff',
            minHeight: isSidebarExpanded ? 184 : 72,
            display: 'flex',
            alignItems: isSidebarExpanded ? 'stretch' : 'center',
            justifyContent: 'center',
            flexDirection: isSidebarExpanded ? 'column' : 'row',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: `0 18px 34px ${alpha('#000000', 0.18)}`,
          }}
        >
          <Stack direction="row" spacing={1.4} alignItems="center" sx={{ alignSelf: 'stretch' }}>
            <Box
              sx={{
                width: isSidebarExpanded ? 46 : 40,
                height: isSidebarExpanded ? 46 : 40,
                borderRadius: 3,
                bgcolor: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 10px 22px rgba(0,0,0,0.18)',
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={CAMPLAR_BRAND.logoMark}
                alt={CAMPLAR_BRAND.name}
                sx={{ width: isSidebarExpanded ? 26 : 22, height: 'auto' }}
              />
            </Box>
            {isSidebarExpanded ? (
              <Box>
                <Typography
                  sx={{
                    fontFamily: CAMPLAR_FONTS.heading,
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {CAMPLAR_BRAND.uppercaseName}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.45,
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: alpha('#ffffff', 0.6),
                  }}
                >
                  Courier Aggregation
                </Typography>
              </Box>
            ) : null}
          </Stack>
          {isSidebarExpanded && (
            <Box sx={{ mt: 'auto' }}>
              <Typography
                sx={{
                  fontSize: '0.64rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: alpha('#ffffff', 0.62),
                  mb: 0.8,
                }}
              >
                Ahmedabad hub
              </Typography>
              <Typography sx={{ fontWeight: 900, fontSize: '1rem', lineHeight: 1.1 }}>
                Camplar control rail
              </Typography>
              <Typography
                sx={{
                  mt: 0.75,
                  color: alpha('#ffffff', 0.68),
                  fontSize: '0.74rem',
                  lineHeight: 1.5,
                }}
              >
                {CAMPLAR_BRAND.address}
              </Typography>
              <Box
                sx={{
                  mt: 1.4,
                  px: 1.3,
                  py: 1,
                  borderRadius: 3,
                  bgcolor: alpha('#ffffff', 0.08),
                  border: `1px solid ${alpha('#ffffff', 0.12)}`,
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: alpha('#ffffff', 0.9) }}>
                  {CAMPLAR_BRAND.email} | {CAMPLAR_BRAND.phonePrimary}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1.4 }}>
        {navGroups.map((group) => {
          const items = navItems
            .filter((item) => item.roles.includes(role || 'customer'))
            .filter((item) => group.items.includes(item.text))

          if (!items.length) return null

          return (
            <Box key={group.label} sx={{ mb: 1.8 }}>
              {isSidebarExpanded && (
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.7,
                    py: 0.9,
                    display: 'block',
                    fontWeight: 800,
                    color: alpha('#ffffff', 0.56),
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontSize: '0.65rem',
                  }}
                >
                  {group.label}
                </Typography>
              )}
              <Box
                sx={{
                  p: isSidebarExpanded ? 0.9 : 0.25,
                  borderRadius: 4.5,
                  bgcolor: alpha('#ffffff', 0.04),
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
                }}
              >
                {renderNavList(items)}
              </Box>
            </Box>
          )
        })}
      </Box>

      <Box sx={{ p: 1.4, borderTop: '1px solid rgba(255,255,255,0.08)', bgcolor: alpha('#000000', 0.08) }}>
        <ListItemButton
          component={NavLink}
          to="/settings"
          sx={{
            ...navItemSx,
            justifyContent: isSidebarExpanded ? 'flex-start' : 'center',
            px: isSidebarExpanded ? 1.6 : 1.1,
            ...(isActive(location.pathname, '/settings') ? activeItemSx : {}),
          }}
        >
          <ListItemIcon sx={{ minWidth: isSidebarExpanded ? 40 : 0, justifyContent: 'center' }}>
            <RiSettings2Fill size={STANDARD_ICON_SIZE} />
          </ListItemIcon>
          {isSidebarExpanded ? (
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ fontSize: '0.88rem', fontWeight: 600 }}
            />
          ) : null}
        </ListItemButton>
      </Box>
    </Box>
  )
}

