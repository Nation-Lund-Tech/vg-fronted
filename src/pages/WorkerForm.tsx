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
import { useParams } from "react-router-dom";
import { Worker } from "../Common/Types";
import RegisterWorkDrawer from "./RegisterWorkDrawer";
import Layout from "../components/Layout";
import RegisterThankDrawer from "./RegisterThankDrawer";

function WorkerForm() {
  const { workerId } = useParams<{ workerId: string }>();

  const [worker, setWorker] = useState<Worker>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();

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
          {worker && (
            <>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box p="2">
                  {worker.firstName} {worker.lastName}
                  <br />
                  <Text>{worker.foodPref}</Text>
                </Box>
                <Spacer />
                <Button onClick={onOpen}>Lägg till pass</Button>
                <RegisterWorkDrawer
                  isOpen={isOpen}
                  close={onClose}
                  worker={worker}
                />
              </Flex>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <Box p="2">
                  <Heading size="sm">
                    Total användbar tacksumma: {worker.bank}
                  </Heading>
                  <Spacer />
                  <Heading size="sm">
                    {`Totalt tack: ${worker.bank / 2}`}
                  </Heading>
                </Box>
                <Spacer />
              </Flex>

              <Button onClick={onOpen2}>Välj tack</Button>
              <RegisterThankDrawer
                isOpen2={isOpen2}
                close={onClose2}
                worker={worker}
              />
            </>
          )}
        </VStack>
      </div>
    </Layout>
  );
}

export default WorkerForm;
