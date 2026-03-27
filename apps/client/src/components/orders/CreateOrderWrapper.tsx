import { alpha, Box, Chip, Grid, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { TbPackages, TbRouteSquare2, TbTruckDelivery } from 'react-icons/tb'
import { CAMPLAR_COLORS, CAMPLAR_FONTS } from '../../utils/brand'
import PageHeading from '../UI/heading/PageHeading'
import B2BOrderForm from './b2b/B2BOrderForm'
import B2COrderFormSteps from './b2c/B2COrderForm'

const heroCards = [
  {
    title: 'Guided Booking',
    value: 'Origin to courier lock',
    caption: 'Four-stage shipment pattern inspired by Camplar Nexus.',
    icon: <TbRouteSquare2 size={20} />,
  },
  {
    title: 'Flow Coverage',
    value: 'B2C and B2B',
    caption: 'Switch modes without leaving the booking surface.',
    icon: <TbPackages size={20} />,
  },
  {
    title: 'Operational Ready',
    value: 'Pickup + rates',
    caption: 'Validate serviceability and compare carriers in one pass.',
    icon: <TbTruckDelivery size={20} />,
  },
]

export default function CreateOrderWrapper() {
  const [activeTab, setActiveTab] = useState<'b2c' | 'b2b'>('b2c')

  return (
    <Stack spacing={3}>
      <PageHeading
        title="Create Shipment"
        subtitle="Launch new bookings inside the Camplar Nexus canvas with a consistent shipping-control theme across B2C and B2B flows."
      />

      <Grid container spacing={2.2}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Grid container spacing={2}>
            {heroCards.map((card) => (
              <Grid key={card.title} size={{ xs: 12, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 5,
                    border: `1px solid ${alpha(CAMPLAR_COLORS.primary, 0.1)}`,
                    background: `
                      radial-gradient(circle at top right, ${alpha(CAMPLAR_COLORS.secondaryBright, 0.14)} 0%, transparent 26%),
                      linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(236,244,255,0.94) 100%)
                    `,
                    boxShadow: `0 16px 34px ${alpha(CAMPLAR_COLORS.text, 0.06)}`,
                    p: 2.3,
                  }}
                >
                  <Stack spacing={1.2}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 3.5,
                        display: 'grid',
                        placeItems: 'center',
                        color: CAMPLAR_COLORS.secondary,
                        bgcolor: alpha(CAMPLAR_COLORS.secondaryBright, 0.12),
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: CAMPLAR_COLORS.textMuted,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: CAMPLAR_FONTS.heading,
                        fontSize: '1.18rem',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: CAMPLAR_COLORS.text,
                      }}
                    >
                      {card.value}
                    </Typography>
                    <Typography sx={{ color: CAMPLAR_COLORS.textMuted, lineHeight: 1.55 }}>
                      {card.caption}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, xl: 4 }}>
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 6,
              overflow: 'hidden',
              border: `1px solid ${alpha(CAMPLAR_COLORS.primary, 0.12)}`,
              background: `
                radial-gradient(circle at 86% 6%, ${alpha(CAMPLAR_COLORS.secondaryBright, 0.2)} 0%, transparent 24%),
                linear-gradient(180deg, rgba(0,11,55,0.98) 0%, rgba(0,29,103,0.95) 100%)
              `,
              color: '#ffffff',
              boxShadow: `0 24px 48px ${alpha(CAMPLAR_COLORS.primary, 0.28)}`,
              p: 2.7,
            }}
          >
            <Stack spacing={1.3}>
              <Chip
                label="Booking Theme"
                sx={{
                  alignSelf: 'flex-start',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  bgcolor: alpha('#ffffff', 0.12),
                }}
              />
              <Typography
                sx={{
                  fontFamily: CAMPLAR_FONTS.heading,
                  fontSize: '1.7rem',
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: '-0.04em',
                }}
              >
                Camplar Nexus
                <br />
                Shipment Desk
              </Typography>
              <Typography sx={{ color: alpha('#ffffff', 0.76), lineHeight: 1.65 }}>
                This page now anchors the rest of the client workspace with the same navy, ember,
                glass-panel visual system you shared for the create-shipment design.
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  p: 1.8,
                  borderRadius: 4,
                  bgcolor: alpha('#ffffff', 0.08),
                  border: `1px solid ${alpha('#ffffff', 0.12)}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: alpha('#ffffff', 0.66),
                  }}
                >
                  Workspace intent
                </Typography>
                <Typography sx={{ mt: 0.8, fontWeight: 700 }}>
                  One route for B2C and B2B booking while preserving existing backend integrations.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 7,
          border: `1px solid ${CAMPLAR_COLORS.outline}`,
          boxShadow: `0 24px 44px ${alpha(CAMPLAR_COLORS.text, 0.08)}`,
          background: `
            radial-gradient(circle at 0% 0%, ${alpha(CAMPLAR_COLORS.primarySoft, 0.07)} 0%, transparent 32%),
            radial-gradient(circle at 100% 0%, ${alpha(CAMPLAR_COLORS.secondaryBright, 0.09)} 0%, transparent 28%),
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,249,255,0.96) 100%)
          `,
          p: { xs: 1.6, sm: 2.2, md: 2.8 },
        }}
      >
        <Stack spacing={2.4}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={1.4}
          >
            <Stack spacing={0.5}>
              <Typography
                sx={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: CAMPLAR_COLORS.textMuted,
                }}
              >
                Flow Switcher
              </Typography>
              <Typography
                sx={{
                  fontFamily: CAMPLAR_FONTS.heading,
                  fontSize: { xs: '1.25rem', md: '1.55rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: CAMPLAR_COLORS.text,
                }}
              >
                Choose the shipment mode
              </Typography>
            </Stack>

            <Chip
              label={activeTab === 'b2c' ? 'Direct-to-customer flow' : 'Invoice-backed bulk flow'}
              sx={{
                fontWeight: 700,
                color: CAMPLAR_COLORS.primary,
                bgcolor: alpha(CAMPLAR_COLORS.primary, 0.06),
                border: `1px solid ${alpha(CAMPLAR_COLORS.primary, 0.12)}`,
              }}
            />
          </Stack>

          <Box>
            <Tabs
              value={activeTab}
              onChange={(_event, newValue: 'b2c' | 'b2b') => setActiveTab(newValue)}
              aria-label="order type tabs"
              sx={{
                minHeight: 'auto',
                '& .MuiTabs-flexContainer': {
                  gap: 1,
                },
                '& .MuiTabs-scroller': {
                  p: 0.85,
                  borderRadius: '999px',
                  bgcolor: alpha(CAMPLAR_COLORS.surfaceLow, 0.96),
                  border: `1px solid ${alpha(CAMPLAR_COLORS.primary, 0.08)}`,
                  boxShadow: `0 12px 24px ${alpha(CAMPLAR_COLORS.text, 0.05)}`,
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  minHeight: 46,
                  borderRadius: '999px',
                  color: CAMPLAR_COLORS.textMuted,
                  minWidth: 160,
                },
                '& .Mui-selected': {
                  color: CAMPLAR_COLORS.primary,
                  backgroundColor: '#ffffff',
                  boxShadow: `0 12px 24px ${alpha(CAMPLAR_COLORS.text, 0.08)}`,
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab label="B2C Shipment" value="b2c" />
              <Tab label="B2B Shipment" value="b2b" />
            </Tabs>
          </Box>

          <Box>{activeTab === 'b2c' ? <B2COrderFormSteps /> : <B2BOrderForm />}</Box>
        </Stack>
      </Paper>
    </Stack>
  )
}
