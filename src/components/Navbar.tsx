import { Box, Spacer, Link, Image, useColorModeValue, Button, HStack, useDisclosure, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, Icon, VStack, StackDivider, IconButton, useMediaQuery } from "@chakra-ui/react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { MdTableRows } from "react-icons/md";

const Links = [
  { name: "Jobbpass", path: "/work-events" },
  { name: "Tackfester", path: "/thank-events" },
  { name: "Workers", path: "/workers" },
];

const NavLinkItem = ({ path, children }: { path: string; children: React.ReactNode }) => (
  <Link as={NavLink} to={path} px={2} py={1} rounded={"md"}>
    {children}
  </Link>
);

export default function Navbar() {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
  const [isMobile] = useMediaQuery("(max-width: 600px)")

  function signout() {
    auth.signout();
  }

  return (

    <HStack bg={useColorModeValue("yellow.400", "gray.900")} width="100%" height="4.5rem" px={4} spacing="1rem"
      alignItems="center">
      <Link as={RouterLink} to="/">
        <Image src="/vgNew.png" alt="Västgöta Nation" width="auto" height="4rem" />
      </Link>

      <Spacer />
      {isMobile && (
        <>
          {auth.user?.email && (
            <IconButton colorScheme="yellow" onClick={onOpen} icon={<MdTableRows />} aria-label="Open drawer" />
          )}

          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth='1px'>
                Navigate
              </DrawerHeader>

              <DrawerBody>
                {isOpen ? (
                  <VStack
                    divider={<StackDivider />}
                    align={"stretch"}
                    spacing="1rem"
                    pb={4}
                  >
                    {Links.map((link) => (
                      <Box>
                        <NavLinkItem key={link.name} path={link.path}>
                          {link.name}
                        </NavLinkItem>
                      </Box>
                    ))}
                    {auth.user?.role == "Admin" && (
                      <Box>
                        <NavLinkItem key="Foremen" path="/foremen">
                          Foremen
                        </NavLinkItem>
                      </Box>
                    )}

                  </VStack>
                ) : null}
              </DrawerBody>

              <DrawerFooter borderTopWidth='1px' >
                <Button onClick={signout} colorScheme="yellow">Log out</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )}
      {!isMobile && (
        <>
          <HStack spacing="1rem" >
            {auth.user?.email && (
              <>
                {Links.map((link) => (
                  <NavLinkItem key={link.name} path={link.path}>
                    {link.name}
                  </NavLinkItem>
                ))}
                {auth.user?.role == "Admin" && (
                    <NavLinkItem key="Foremen" path="/foremen">
                      Foremen
                    </NavLinkItem>
                )}
                <Button onClick={signout} colorScheme="yellow">Log out</Button>
              </>
            )}
          </HStack>
        </>
      )}
    </HStack>
  );
};
