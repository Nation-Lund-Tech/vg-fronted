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
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Worker } from "../Common/Types";
import RegisterDrawer from "./RegisterDrawer";
import Layout from "../components/Layout";

function WorkerForm() {
  const { workerId } = useParams<{ workerId: string }>();

  const [worker, setWorker] = useState<Worker>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getWorker = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/Worker/id/${workerId}`
    );
    const data: Worker = await response.json();
    setWorker(data);
  };

  useEffect(() => {
    getWorker();
  }, []);

  return (
    <Layout>
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
              <Text>Food preference: {worker?.foodPref}</Text>
              <Text>Email: {worker?.email}</Text>
            </Box>
            <Spacer />
            <Link to={"/update-worker"}>
              <Button>Uppdatera</Button>
            </Link>
            <Button onClick={onOpen}>Lägg till pass</Button>
            <RegisterDrawer isOpen={isOpen} close={onClose} worker={worker!} />
          </Flex>
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box p="2">
              <Heading size="sm">
                Total användbar tacksumma: {worker?.bank}
              </Heading>
              <Spacer />
              <Heading size="sm">
                {worker && `Totalt tack: ${worker.bank / 2}`}
              </Heading>
            </Box>
            <Spacer />
          </Flex>
          <Button>Välj tack</Button>
        </VStack>
      </div>
    </Layout>
  );
}

export default WorkerForm;
