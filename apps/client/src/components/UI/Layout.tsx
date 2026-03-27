import { Box, Container, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { DRAWER_WIDTH } from '../../utils/constants'
import Navbar from '../Navbar/Navbar'
import KeyboardShortcuts from './keyboard/KeyboardShortcuts'
import FullScreenLoader from './loader/FullScreenLoader'
import Sidebar, { COLLAPSED_WIDTH } from './Sidebar'
import { CAMPLAR_COLORS } from '../../utils/brand'

export default function Layout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [pinned, setPinned] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleDrawerToggle = () => {
    if (isMobile) setMobileOpen(!mobileOpen)
    else setPinned((prev) => !prev)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: CAMPLAR_COLORS.surface,
        backgroundImage:
          'radial-gradient(circle at 12% 6%, rgba(0,29,103,0.12) 0%, transparent 30%), radial-gradient(circle at 88% 8%, rgba(255,94,20,0.12) 0%, transparent 26%), linear-gradient(180deg, #fbfcff 0%, #f7f9ff 52%, #eef5ff 100%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '100%', lg: '46%' },
          height: '100%',
          pointerEvents: 'none',
          background:
            'linear-gradient(270deg, rgba(236,244,255,0.42) 0%, rgba(236,244,255,0.14) 36%, rgba(236,244,255,0) 100%)',
        }}
      />

      <KeyboardShortcuts />

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              bgcolor: CAMPLAR_COLORS.primary,
              color: '#ffffff',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <Sidebar
            hovered={hovered}
            setHovered={setHovered}
            pinned
            handleDrawerToggle={handleDrawerToggle}
          />
        </Drawer>
      ) : (
        <Box
          sx={{
            width: pinned ? DRAWER_WIDTH : COLLAPSED_WIDTH,
            minWidth: pinned ? DRAWER_WIDTH : COLLAPSED_WIDTH,
            flexShrink: 0,
            transition: 'width 240ms ease',
            position: 'relative',
          }}
        >
          <Sidebar
            hovered={hovered}
            setHovered={setHovered}
            pinned={pinned}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>
      )}

      <Stack
        sx={{
          flexGrow: 1,
          minWidth: 0,
          transition: 'margin-left 240ms ease',
          position: 'relative',
          height: '100vh',
          overflowX: 'hidden',
          bgcolor: 'transparent',
          px: { xs: 0.8, md: 1.5 },
          py: { xs: 0.95, md: 1.4 },
        }}
      >
        <Stack sx={{ flexGrow: 1, minHeight: 0, bgcolor: 'transparent' }}>
          <Navbar handleDrawerToggle={handleDrawerToggle} pinned={pinned} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              bgcolor: 'transparent',
              px: { xs: 1.1, md: 2.4 },
              pb: { xs: 2.2, md: 3.2 },
              minHeight: 0,
            }}
          >
            <Container
              maxWidth="xl"
              sx={{
                bgcolor: 'transparent',
                pt: 0.75,
                overflowX: 'hidden',
              }}
            >
              <Suspense fallback={<FullScreenLoader />}>
                <Outlet />
              </Suspense>
            </Container>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
