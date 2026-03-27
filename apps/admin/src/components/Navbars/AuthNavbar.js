import { Box, Button, Flex, HStack, Link, Text, useColorModeValue } from '@chakra-ui/react'
import SidebarResponsive from 'components/Sidebar/SidebarResponsive'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import routes from 'routes.js'
import { CAMPLAR_BRAND } from '../../utils/brand'

const navLinks = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Orders', to: '/admin/orders' },
  { label: 'Support', to: '/admin/support' },
]

export default function AuthNavbar(props) {
  const { logoText, secondary, ...rest } = props

  const defaultMainText = useColorModeValue('#001E31', 'gray.100')
  const defaultMutedText = useColorModeValue('#5F7187', 'gray.400')
  const defaultNavbarBg = useColorModeValue('rgba(255,255,255,0.94)', 'rgba(0,11,55,0.94)')
  const defaultNavbarBorder = useColorModeValue('1px solid rgba(0,11,55,0.08)', '1px solid rgba(255,255,255,0.12)')
  const defaultNavbarShadow = useColorModeValue('0 18px 36px rgba(0, 30, 49, 0.1)', '0 18px 36px rgba(0, 0, 0, 0.42)')
  const navShellBg = useColorModeValue('rgba(255,255,255,0.72)', 'rgba(255,255,255,0.06)')
  const navShellBorder = useColorModeValue('rgba(23,19,16,0.08)', 'rgba(255,255,255,0.12)')
  const navHoverBg = useColorModeValue('rgba(217,121,67,0.12)', 'rgba(255,255,255,0.08)')
  const mainText = secondary ? 'white' : defaultMainText
  const mutedText = secondary ? 'whiteAlpha.700' : defaultMutedText
  const navbarBg = secondary ? 'none' : defaultNavbarBg
  const navbarBorder = secondary ? 'none' : defaultNavbarBorder
  const navbarShadow = secondary ? 'none' : defaultNavbarShadow

  return (
    <Flex
      position={secondary ? 'absolute' : 'fixed'}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      backdropFilter={secondary ? 'none' : 'blur(14px)'}
      borderRadius="28px"
      px={{ base: '14px', md: '18px' }}
      py="14px"
      mx="auto"
      width="1180px"
      maxW="94%"
      alignItems="center"
    >
      <Flex w="100%" justifyContent={{ base: 'start', lg: 'space-between' }} align="center" gap={4}>
        <Link href={`${process.env.PUBLIC_URL}/#/`} display="flex" alignItems="center" color={mainText}>
          <Box as="img" src="/logo/camplar-wordmark.svg" alt="Camplar" h="38px" w="154px" objectFit="contain" me="12px" />
          <Box display={{ base: 'none', md: 'block' }}>
            <Text fontSize="xs" letterSpacing="0.16em" textTransform="uppercase" fontWeight="800" color="secondary.500">
              {CAMPLAR_BRAND.uppercaseName}
            </Text>
            <Text fontSize="sm" color={mutedText}>
              Ahmedabad, Gujarat
            </Text>
          </Box>
        </Link>

        <HStack
          display={{ base: 'none', lg: 'flex' }}
          spacing={1}
          px="8px"
          py="6px"
          borderRadius="999px"
          border="1px solid"
          borderColor={navShellBorder}
          bg={navShellBg}
        >
          {navLinks.map((item) => (
            <NavLink to={item.to} key={item.label}>
              <Button
                variant="ghost"
                borderRadius="999px"
                px="16px"
                py="10px"
                fontSize="sm"
                fontWeight="700"
                color={mainText}
                _hover={{ bg: navHoverBg }}
              >
                {item.label}
              </Button>
            </NavLink>
          ))}
        </HStack>

        <Box ms={{ base: 'auto', lg: '0px' }} display={{ base: 'flex', lg: 'none' }}>
          <SidebarResponsive logoText={logoText || 'Camplar'} secondary={secondary} routes={routes} {...rest} />
        </Box>

        <Link href="/auth/signin" display={{ base: 'none', lg: 'block' }}>
          <Button
            bg="brand.500"
            color="white"
            fontSize="sm"
            borderRadius="999px"
            px="20px"
            _hover={{ bg: 'brand.600' }}
          >
            Admin access
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
}
