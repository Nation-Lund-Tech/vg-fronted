import React, { useEffect, useState } from "react";
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
import { User1 } from "../Common/Types";

function WorkerForm() {
  const { workerId } = useParams<{ workerId: string }>();

  const [worker, setWorker] = useState<User1>();

  const getWorker = async () => {
    const response = await fetch(
      `https://localhost:7008/api/Worker/id/${workerId}`
    );
    const data: User1 = await response.json();
    setWorker(data);
  };

  useEffect(() => {
    getWorker();
  }, []);

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
          <Box p="2">
            {worker?.firstName} {worker?.lastName}
            <br />
            <Text>{worker?.foodPref}</Text>
          </Box>
          <Spacer />
          <Button>Lägg till pass</Button>
        </Flex>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="sm">
              Total användbar tacksumma: {worker?.bank}
            </Heading>
            <Spacer />
            <Heading size="sm">
              {worker && `Totalt tack: ${worker.bank % 2}`}
            </Heading>
          </Box>
          <Spacer />
        </Flex>
        <Button>Välj tack</Button>
      </VStack>
    </div>
  );
}

export default WorkerForm;
