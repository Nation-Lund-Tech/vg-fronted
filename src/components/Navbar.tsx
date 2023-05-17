import { Box, Spacer, Link, Image, useColorModeValue, Button, HStack } from "@chakra-ui/react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

const Links = [
  { name: "Jobbpass", path: "/work-events" },
  { name: "Tackfester", path: "/thank-events" },
  { name: "Workers", path: "/workers" },
];

const NavLinkItem = ({ path, children }: { path: string; children: React.ReactNode }) => (
  <Link as={NavLink} to={path} px={2} py={1} rounded={"md"} _hover={{ textDecoration: "none", bg: useColorModeValue("yellow.500", "gray.700") }}>
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
    <HStack bg={useColorModeValue("yellow.400", "gray.900")} width="100%" height= "4.5rem"px={4} spacing="1rem"
      alignItems="center">
      <Link as={RouterLink} to="/">
        <Image src="/vgslogga1.png" alt="Västgöta Nation" width="auto" height="3.5rem" />
      </Link>
      
      <Spacer />
      <HStack spacing="1rem" display={{ base: "none", md: "flex" }}>
        {auth.user?.email && (
          <>
            {Links.map((link) => (
              <NavLinkItem key={link.name} path={link.path}>
                {link.name}
              </NavLinkItem>
            ))}
            {auth.user?.role == "Admin" && (
          <>
            <NavLinkItem key="Foremen"path="/foremen">
              Foremen
            </NavLinkItem>  
          </>
        )}
            <Button onClick={signout} colorScheme="yellow">Log out</Button>
          </>
        )}
      </HStack>
      {/* <IconButton
        aria-label="Open Menu"
        size="md"
        mr={2}
        icon={<HamburgerIcon />}
        display={{ md: "none" }}
        onClick={toggle}
      /> */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          {Links.map((link) => (
            <NavLinkItem key={link.name} path={link.path}>
              {link.name}
            </NavLinkItem>
          ))}
        </Box>
      ) : null}
    </HStack>
  );
};
