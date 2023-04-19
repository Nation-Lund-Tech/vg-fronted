import {
  VStack,
  Heading,
  Text,
  HStack,
  StackDivider,
  Button,
  Spacer,
  Input,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody
} from "@chakra-ui/react";

import {User} from "../Common/Types"

import {AddIcon, SmallAddIcon} from "@chakra-ui/icons"

import { useNavigate, Link, useParams } from "react-router-dom";
import { useState } from "react";
import React from "react";

function WorkList() {

  const [size, setSize] = React.useState('')
  const {isOpen, onOpen, onClose} = useDisclosure()
  const sizes = 'full'

  const handleClick = (drawerSize: string) => {
    setSize(drawerSize)
    onOpen()
  }

  const employees = [
    {
      id: 1,
      name: "John Doe",
      department: "Lunch",
    },
    {
      id: 2,
      name: "Jane Doe",
      department: "Klubb",
    },
  ];

  /*
  const navigate = useNavigate();

  const handleProfileClick = (employee: { id: any; }) => {
    navigate(`/profile/${employee.id}`);
  }
  */


  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="4"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }} 
      alignItems="stretch"
    >
      <HStack justifyContent="space-between">
        <Heading as="h1" size="2xl" textAlign="center" my={4}>
          Jobbare
        </Heading>
        <Link to={"/add-worker"}>
        <Button colorScheme="green" leftIcon={<AddIcon/>}>Skapa jobbare</Button>
        </Link>
      </HStack>
      <Input placeholder="Sök Profil..." size="sm" />
      {employees.map((employee) => (
        <HStack key={employee.id}>
          <Link to={"/arbetare/${employee.id}"}>
          <Text as="a">{employee.name}</Text>
          </Link>
          <Text>{employee.department}</Text>

          <Spacer />
          <Button colorScheme="red">Remove</Button>
        </HStack>
      ))}
      <HStack>
        <Button size="sm" onClick={() => handleClick(sizes)}>Registrera pass</Button>
        <Drawer onClose={onClose} isOpen={isOpen} size='full'>
          <DrawerOverlay/>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>Jobbare</DrawerHeader>
            <DrawerBody>
              <p>Lista med jobbare</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Spacer/>
        <Button size="sm" onClick={() => handleClick(sizes)}>Registrera pass</Button>
        <Drawer onClose={onClose} isOpen={isOpen} size='full'>
          <DrawerOverlay/>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>Jobbare</DrawerHeader>
            <DrawerBody>
              <VStack>
                <p>Lista med jobbare</p>
                <Button colorScheme="green" size="sm">Registrera</Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </VStack>
  );
}

export default WorkList;
