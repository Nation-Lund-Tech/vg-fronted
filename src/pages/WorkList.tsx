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
  PopoverFooter
} from "@chakra-ui/react";

import {User} from "../Common/Types"

import {AddIcon, SmallAddIcon} from "@chakra-ui/icons"

import { useNavigate, Link, useParams } from "react-router-dom";
import { useState } from "react";

function WorkList() {
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
        <Popover>
        <PopoverTrigger>
          <Button size="sm">Registrera pass</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Välj jobbare</PopoverHeader>
          <PopoverBody>
            Lägg till lista med jobbare 
          </PopoverBody>
          <PopoverFooter>
            <Button size={"sm"} colorScheme="green">Registrera</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
        <Spacer/>
        <Popover>
        <PopoverTrigger>
          <Button size="sm">Registrera tack</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Välj jobbare</PopoverHeader>
          <PopoverBody>
            Lägg till lista med jobbare
          </PopoverBody>
          <PopoverFooter>
            <Button size="sm" colorScheme="green">Registrera</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      </HStack>
    </VStack>
  );
}

export default WorkList;
