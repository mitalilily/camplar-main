import { Box, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { CAMPLAR_BRAND } from '../../utils/brand'

export default function Footer() {
  const textColor = useColorModeValue('rgba(0,30,49,0.68)', 'gray.400')
  const linkColor = useColorModeValue('brand.500', 'brand.300')
  const borderColor = useColorModeValue('rgba(0,11,55,0.08)', 'rgba(255,255,255,0.08)')

  return (
    <Flex
      flexDirection={{ base: 'column', xl: 'row' }}
      alignItems={{ base: 'center', xl: 'center' }}
      justifyContent="space-between"
      px="30px"
      py="22px"
      w="100%"
      mt="16px"
    >
      <Box
        px="18px"
        py="14px"
        borderRadius="20px"
        border="1px solid"
        borderColor={borderColor}
        bg={useColorModeValue('rgba(255,255,255,0.74)', 'rgba(15,27,45,0.72)')}
      >
        <Text
          color={textColor}
          textAlign={{ base: 'center', xl: 'start' }}
          fontSize="sm"
        >
          &copy; {new Date().getFullYear()} {CAMPLAR_BRAND.name} admin workspace.
          <Link
            color={linkColor}
            href={CAMPLAR_BRAND.website}
            target="_blank"
            fontWeight="semibold"
            ms="6px"
          >
            Open brand site
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}
