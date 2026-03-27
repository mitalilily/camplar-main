import { Box } from '@chakra-ui/react'
import React from 'react'
import SidebarContent from './SidebarContent'

function Sidebar(props) {
  const mainPanel = React.useRef()
  const { logoText, routes, sidebarVariant, sidebarWidth } = props

  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: 'none', xl: 'block' }} position="fixed" top="0" left="0" h="100vh" pointerEvents="none">
        <Box
          pointerEvents="auto"
          w={`${sidebarWidth}px`}
          maxW="400px"
          minW="220px"
          ms={{ sm: '18px' }}
          my={{ sm: '18px' }}
          h="calc(100vh - 36px)"
          borderRadius="30px"
          background="linear-gradient(180deg, rgba(0,11,55,0.96) 0%, rgba(0,29,103,0.94) 100%)"
          border="1px solid rgba(255,255,255,0.08)"
          boxShadow="0 28px 60px rgba(0,11,55,0.24)"
          overflow="hidden"
          position="relative"
        >
          <SidebarContent
            sidebarWidth={sidebarWidth}
            routes={routes}
            logoText={logoText || 'Camplar'}
            sidebarVariant={sidebarVariant}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
