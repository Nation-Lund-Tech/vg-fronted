import { Box, Flex, Spacer, Link, IconButton, useColorModeValue, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";

const Links = [
  { name: "Events", path: "/events" },
  { name: "Jobbare", path: "/workers" },
];

const NavLinkItem = ({ path, children }: { path: string; children: React.ReactNode }) => (
  <Link as={NavLink} to={path} px={2} py={1} rounded={"md"} _hover={{ textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700") }}>
    {children}
  </Link>
);

export default function Navbar() {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function signout() {
    auth.signout();
  }

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

        {auth.user?.email && (
          <>
            {Links.map((link) => (
              <NavLinkItem key={link.name} path={link.path}>
                {link.name}
              </NavLinkItem>
            ))}
            <Button onClick={signout}>Logga ut</Button>
          </>
        )}
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
