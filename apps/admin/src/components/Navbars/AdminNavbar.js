import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AdminNavbarLinks from "./AdminNavbarLinks";
import { CAMPLAR_BRAND } from "../../utils/brand";

const navItems = [
  { label: "Overview", path: "/admin/dashboard" },
  { label: "Orders", path: "/admin/orders" },
  { label: "Shipping", path: "/admin/couriers" },
  { label: "Finance", path: "/admin/billing-invoices" },
  { label: "Support", path: "/admin/support" },
];

export default function AdminNavbar(props) {
  const { fixed, secondary, onOpen, sidebarWidth = 275, brandText, ...rest } = props;

  const mainText = useColorModeValue("#171310", "gray.100");
  const secondaryText = useColorModeValue("#74685D", "gray.400");
  const navbarShadow = useColorModeValue(
    "0 18px 36px rgba(23,19,16,0.08)",
    "0 18px 36px rgba(0, 0, 0, 0.4)"
  );
  const defaultNavbarBg = useColorModeValue(
    "rgba(255,252,248,0.94)",
    "linear-gradient(110deg, rgba(22,18,15,0.94) 0%, rgba(34,28,24,0.94) 100%)"
  );
  const defaultNavbarBorder = useColorModeValue(
    "1px solid rgba(23,19,16,0.08)",
    "1px solid rgba(255,255,255,0.12)"
  );
  const activeBg = useColorModeValue(
    "rgba(217,121,67,0.12)",
    "rgba(255,255,255,0.08)"
  );
  const navShellBg = useColorModeValue(
    "rgba(255,255,255,0.72)",
    "rgba(255,255,255,0.06)"
  );
  const navShellBorder = useColorModeValue(
    "rgba(23,19,16,0.08)",
    "rgba(255,255,255,0.12)"
  );
  const addressBg = useColorModeValue(
    "rgba(23,19,16,0.04)",
    "rgba(255,255,255,0.08)"
  );
  const addressBorder = useColorModeValue(
    "1px solid rgba(23,19,16,0.08)",
    "1px solid rgba(255,255,255,0.12)"
  );
  const navbarBg = secondary ? "transparent" : defaultNavbarBg;
  const navbarBorder = secondary ? "none" : defaultNavbarBorder;

  return (
    <Flex
      position={fixed || !secondary ? "fixed" : "absolute"}
      boxShadow={secondary ? "none" : navbarShadow}
      bg={navbarBg}
      border={navbarBorder}
      backdropFilter={secondary ? "none" : "blur(14px)"}
      transition="all 0.3s ease"
      alignItems="center"
      borderRadius="28px"
      minH="82px"
      left={{ base: "12px", md: "18px", xl: `${sidebarWidth + 36}px` }}
      right="20px"
      px={{ sm: "18px", md: "24px" }}
      py="12px"
      top="18px"
    >
      <Flex
        w="100%"
        flexDirection={{ base: "column", "2xl": "row" }}
        alignItems={{ base: "stretch", "2xl": "center" }}
        justify="space-between"
        gap={{ base: 3, "2xl": 4 }}
      >
        <Flex
          direction="column"
          align={{ base: "center", md: "flex-start" }}
          minW={0}
          w={{ base: "100%", "2xl": "auto" }}
          flex={{ "2xl": "0 1 220px" }}
        >
          <Box
            as="img"
            src="/logo/camplar-wordmark.svg"
            alt="Camplar"
            h="40px"
            w="152px"
            objectFit="contain"
          />
          <Stack
            spacing={0.4}
            mt={2}
            minW={0}
            align={{ base: "center", md: "flex-start" }}
          >
            <Text
              fontSize="xs"
              fontWeight="800"
              letterSpacing="0.18em"
              textTransform="uppercase"
              color={mainText}
              textAlign={{ base: "center", md: "left" }}
            >
              {CAMPLAR_BRAND.uppercaseName}
            </Text>
            {brandText ? (
              <HStack spacing={2} color={secondaryText}>
                <Text
                  fontSize="10px"
                  fontWeight="800"
                  letterSpacing="0.16em"
                  textTransform="uppercase"
                >
                  Admin
                </Text>
                <Text color={secondaryText}>/</Text>
                <Text
                  fontSize="10px"
                  fontWeight="800"
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  color="secondary.500"
                >
                  {brandText}
                </Text>
              </HStack>
            ) : null}
          </Stack>
        </Flex>

        <HStack
          display={{ base: "none", "2xl": "flex" }}
          spacing={1}
          px="8px"
          py="6px"
          borderRadius="999px"
          border="1px solid"
          borderColor={navShellBorder}
          bg={navShellBg}
        >
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.path}>
              <Button
                variant="ghost"
                borderRadius="999px"
                px="16px"
                py="10px"
                fontSize="sm"
                fontWeight="700"
                color={mainText}
                _hover={{ bg: activeBg }}
              >
                {item.label}
              </Button>
            </NavLink>
          ))}
        </HStack>

        <HStack
          ms={{ base: 0, "2xl": "auto" }}
          spacing={3}
          align="center"
          justify={{ base: "space-between", md: "flex-end" }}
          w={{ base: "100%", "2xl": "auto" }}
          flexWrap="wrap"
        >
          <Box
            display={{ base: "none", "2xl": "flex" }}
            px={3.5}
            py={2}
            borderRadius="999px"
            bg={addressBg}
            border={addressBorder}
          >
            <Text fontSize="xs" fontWeight="700" color={mainText}>
              Ahmedabad, Gujarat
            </Text>
          </Box>
          <AdminNavbarLinks
            onOpen={onOpen}
            logoText={props.logoText}
            secondary={secondary}
            fixed={fixed}
            {...rest}
          />
        </HStack>
      </Flex>
    </Flex>
  );
}

AdminNavbar.propTypes = {
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
  sidebarWidth: PropTypes.number,
};
