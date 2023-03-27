import {
  VStack,
  Heading,
  Text,
  HStack,
  IconButton,
  StackDivider,
  Button,
  Spacer,
  Divider,
  Input,
} from "@chakra-ui/react";

import { useNavigate, Link } from "react-router-dom";

function WorkList() {
  const Employees = [
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
        <Button colorScheme="green">Add Worker</Button>
        </Link>
      </HStack>
      <Input placeholder="Sök Profil..." size="sm" />
      {Employees.map((employee) => (
        <HStack key={employee.id}>
          <Text>{employee.name}</Text>
          <Text>{employee.department}</Text>
          <Spacer />
          <Button>Remove</Button>
        </HStack>
      ))}
    </VStack>
  );
}

export default WorkList;
