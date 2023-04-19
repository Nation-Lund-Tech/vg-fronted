import React from "react";
import {
  Heading,
  Flex,
  Box,
  Spacer,
  Button,
  VStack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";


function WorkerForm() {

  const { employeeName } = useParams<{ employeeName: string }>();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">{employeeName}, Lunch
          <br />
          <Text>Matpref: </Text>
          </Box>
          <Spacer />
          <Button>Lägg till pass</Button>
        </Flex>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="sm">Total användbar tacksumma: </Heading>
            <Spacer />
            <Heading size="sm">Total tack: </Heading>
          </Box>
          <Spacer />
        </Flex>
        <Button>Välj tack</Button>
      </VStack>
    </div>
  );
}

export default WorkerForm;
