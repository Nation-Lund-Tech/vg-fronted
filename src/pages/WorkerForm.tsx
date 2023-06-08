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
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { Worker } from "../Common/Types";
import RegisterDrawer from "./RegisterDrawer";
import RegisterThankDrawer from "./RegisterThankDrawer";
import Layout from "../components/Layout";
import {
  MdPerson,
  MdEmail,
  MdAttachMoney,
  MdUpdate,
  MdFoodBank,
} from "react-icons/md";

function WorkerForm() {
  const { workerId } = useParams<{ workerId: string }>();

  const [worker, setWorker] = useState<Worker>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

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
          borderColor="gray.100"
          borderWidth="2px"
          p="4"
          borderRadius="lg"
          w="100%"
          maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
          alignItems="stretch"
        >

        <StackDivider borderColor="gray.500" />

          {worker && (
            <VStack alignItems="flex-start">
              <Link to={`/workers/${worker.id}`}>
                <HStack>
                  <Icon as={MdPerson} w={5} h={5} />
                  <Text as="a">{`${worker.firstName} ${worker.lastName}`}</Text>
                </HStack>
              </Link>
              <HStack>
                <Icon as={MdEmail} w={5} h={5} />
                <Text as="a">{worker.email}</Text>
              </HStack>
              <HStack>
                <Icon as={MdAttachMoney} w={5} h={5} />
                <Text as="a">{worker.bank}</Text>
              </HStack>
              <HStack>
                <Icon as={MdFoodBank} w={5} h={5} />
                <Text as="a">{worker.foodPref}</Text>
              </HStack>
              <HStack>
                <Icon as={MdUpdate} w={5} h={5} />
                <Text as="a">
                  {new Date(worker.lastUpdate).toLocaleDateString()}
                </Text>
              </HStack>
            </VStack>
          )}

          <Button onClick={onOpen}>
            Add workshift
            <RegisterDrawer isOpen={isOpen} close={onClose} worker={worker!} />
          </Button>
          
          <Button onClick={onOpen2}>Choose reward</Button>
          <RegisterThankDrawer
            isOpen2={isOpen2}
            close={onClose2}
            worker={worker!}
          />
          <Link to={`/update-worker/${workerId}`}>
          <Button width="100%">
            Update Profile
          </Button>
          </Link>
        </VStack>
      </div>
    </Layout>
  );
}

export default WorkerForm;
