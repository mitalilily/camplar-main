import {
  Box,
  Chip,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import PageHeading from '../../components/UI/heading/PageHeading'
import MapViewer from '../../components/UI/map/MapViewer'
import { CAMPLAR_BRAND } from '../../utils/brand'

const CompanyDetails = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const coords = { lat: 23.0308, lng: 72.4699 }

  return (
    <Stack mt={2} gap={5}>
      <PageHeading
        title="Contact Us"
        subtitle={`We are here to help with bookings, account support, and courier operations. Reach out to ${CAMPLAR_BRAND.name} whenever you need assistance.`}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 5,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            bgcolor: theme.palette.background.paper,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="secondary" gutterBottom>
            {CAMPLAR_BRAND.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <FiMapPin size={22} color={theme.palette.primary.main} />
            <Typography fontSize="1rem">{CAMPLAR_BRAND.address}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FiMail size={22} color={theme.palette.primary.main} />
            <Chip
              clickable
              component={Link}
              href={`mailto:${CAMPLAR_BRAND.email}`}
              label={CAMPLAR_BRAND.email}
              color="primary"
              variant="filled"
              icon={<FiMail size={16} />}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FiPhone size={22} color={theme.palette.primary.main} />
            <Chip
              clickable
              component={Link}
              href={`tel:+91${CAMPLAR_BRAND.phonePrimary}`}
              label={`+91 ${CAMPLAR_BRAND.phonePrimary}`}
              color="success"
              variant="filled"
              icon={<FiPhone size={16} />}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FiPhone size={22} color={theme.palette.primary.main} />
            <Chip
              clickable
              component={Link}
              href={`tel:+91${CAMPLAR_BRAND.phoneSecondary}`}
              label={`+91 ${CAMPLAR_BRAND.phoneSecondary}`}
              color="secondary"
              variant="filled"
              icon={<FiPhone size={16} />}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <FiClock size={22} color={theme.palette.primary.main} />
            <Box>
              <Typography fontSize="1rem">Monday - Saturday: 10:00 AM - 7:00 PM</Typography>
              <Typography fontSize="1rem">Sunday: Closed</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper
          elevation={4}
          sx={{
            flex: 1,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <MapViewer
            coords={coords}
            height={isMobile ? '280px' : '400px'}
            width="100%"
            draggable={false}
            zoom={16}
            popupText={CAMPLAR_BRAND.name}
            currentLocation={false}
          />
        </Paper>
      </Box>
    </Stack>
  )
}

export default CompanyDetails
