import { Box, Flex, Spacer, Link, IconButton, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Links = [
  { name: "Events", path: "/events" },
  { name: "Jobbare", path: "/workers" },
  { name: "Logga in", path: "/login"},
];

const NavLinkItem = ({ path, children }: { path: string; children: React.ReactNode }) => (
  <NavLink to={path}>
    <Link px={2} py={1} rounded={"md"} _hover={{ textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700") }}>
      {children}
    </Link>
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Flex bg={useColorModeValue("gray.100", "gray.900")} width="100%" px={4} justifyContent="space-between"
    alignItems="center">
      <Box p={2}>
        <Link href="/" fontSize="xl" fontWeight="bold">
          Västgöta Nation
        </Link>
      </Box>
      <Spacer />
      <Box display={{ base: "none", md: "flex" }}>
        {Links.map((link) => (
          <NavLinkItem key={link.name} path={link.path}>
            {link.name}
          </NavLinkItem>
        ))}
      </Box>
      <IconButton
        aria-label="Open Menu"
        size="md"
        mr={2}
        icon={<HamburgerIcon />}
        display={{ md: "none" }}
        onClick={toggle}
      />
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          {Links.map((link) => (
            <NavLinkItem key={link.name} path={link.path}>
              {link.name}
            </NavLinkItem>
          ))}
        </Box>
      ) : null}
    </Flex>
  );
};

export default Navbar;
