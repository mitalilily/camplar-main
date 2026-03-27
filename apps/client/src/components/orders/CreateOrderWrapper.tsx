import { Box, Container, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import PageHeading from '../UI/heading/PageHeading'
import B2BOrderForm from './b2b/B2BOrderForm'
import B2COrderFormSteps from './b2c/B2COrderForm'
import { CAMPLAR_COLORS } from '../../utils/brand'

const CreateOrderWrapper = () => {
  const [activeTab, setActiveTab] = useState<'b2c' | 'b2b'>('b2c')

  const handleTabChange = (_event: React.SyntheticEvent, newValue: 'b2c' | 'b2b') => {
    setActiveTab(newValue)
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: 1.5, sm: 2, md: 3 }, // responsive horizontal padding
        py: { xs: 2, sm: 3 }, // responsive vertical padding
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 }, // tighter gap on mobile
        }}
      >
        <PageHeading
          title="Create Shipment"
          subtitle="Switch between B2C and B2B flows while keeping the booking logic untouched."
        />

        <Box
          sx={{
            flex: 1,
            bgcolor: '#FFFFFF',
            border: `1px solid ${CAMPLAR_COLORS.outline}`,
            borderRadius: { xs: 4, sm: 5 },
            boxShadow: '0 24px 44px rgba(0,30,49,0.08)',
            backgroundImage:
              'radial-gradient(circle at 0% 0%, rgba(0,29,103,0.07) 0%, transparent 32%), radial-gradient(circle at 100% 0%, rgba(255,94,20,0.08) 0%, transparent 28%)',
            p: { xs: 1.5, sm: 2.25, md: 3 },
            minHeight: '70vh',
          }}
        >
          {/* Tabs */}
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="order type tabs"
              sx={{
                minHeight: 'auto',
                '& .MuiTabs-flexContainer': {
                  gap: 1,
                },
                '& .MuiTabs-scroller': {
                  p: 0.75,
                  borderRadius: '999px',
                  bgcolor: 'rgba(236,244,255,0.94)',
                  border: `1px solid ${CAMPLAR_COLORS.outline}`,
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  minHeight: 44,
                  borderRadius: '999px',
                  color: CAMPLAR_COLORS.textMuted,
                  minWidth: 148,
                },
                '& .Mui-selected': {
                  color: CAMPLAR_COLORS.primary,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 20px rgba(0,30,49,0.08)',
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab label="B2C Order" value="b2c" />
              <Tab label="B2B Order" value="b2b" />
            </Tabs>
          </Box>

          {/* Form Content */}
          <Box>{activeTab === 'b2c' ? <B2COrderFormSteps /> : <B2BOrderForm />}</Box>
        </Box>
      </Box>
    </Container>
  )
}

export default CreateOrderWrapper
