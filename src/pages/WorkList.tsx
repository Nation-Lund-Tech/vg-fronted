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
  DrawerBody,
} from "@chakra-ui/react";

import { User1 } from "../Common/Types";

import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";

import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

function WorkList() {
  const [size, setSize] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sizes = "full";

  const handleClick = (drawerSize: string) => {
    setSize(drawerSize);
    onOpen();
  };

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

  // fetch data from https://localhost:7008/api/Worker/name/Arvid

  const [workers, setWorkers] = useState<User1[]>();

  const getWorker = async () => {
    const response = await fetch(`https://localhost:7008/api/Worker/all`);
    const data: User1[] = await response.json();
    setWorkers(data);
  };
  useEffect(() => {
    getWorker();
  }, []);

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
          <Button colorScheme="green" leftIcon={<AddIcon />}>
            Skapa jobbare
          </Button>
        </Link>
      </HStack>
      <Input placeholder="Sök Profil..." size="sm" />
      {/* {worker && 
      <HStack>
          <Link to={"/arbetare/${employee.id}"}>
            <Text as="a">{worker.firstName}</Text>
          </Link>
          <Text>{worker.email}</Text>
          <Spacer />
          <Button colorScheme="red">Remove</Button>
        </HStack>
} */}
      {workers &&
        workers.map((worker) => (
          <HStack key={worker.id}>
            <Link to={`/arbetare/${worker.id}`}>
              <Text as="a">{worker.firstName}</Text>
            </Link>
            <Text>{worker.email}</Text>
            <Spacer />
            <Button colorScheme="red">Remove</Button>
          </HStack>
        ))}
      <HStack>
        <Button size="sm" onClick={() => handleClick(sizes)}>
          Registrera pass
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Jobbare</DrawerHeader>
            <DrawerBody>
              <p>Lista med jobbare</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Spacer />
        <Button size="sm" onClick={() => handleClick(sizes)}>
          Registrera pass
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Jobbare</DrawerHeader>
            <DrawerBody>
              <VStack>
                <p>Lista med jobbare</p>
                <Button colorScheme="green" size="sm">
                  Registrera
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </VStack>
  );
}

export default WorkList;
