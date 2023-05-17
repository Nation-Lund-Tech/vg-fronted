import {
  VStack,
  Heading,
  Text,
  HStack,
  StackDivider,
  Button,
  Spacer,
  Input,
  Center,
  Icon,
} from "@chakra-ui/react";

import { MdPerson, MdEmail, MdAttachMoney, MdUpdate } from "react-icons/md";
import { Worker } from "../Common/Types";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../providers/AuthProvider";

function WorkList() {
  const auth = useAuth();
  const [workers, setWorkers] = useState<Worker[]>();
  const [search, setSearch] = useState<string>("");

  const getWorker = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/Worker/all`
    );
    const data: Worker[] = await response.json();
    setWorkers(data);
  };
  useEffect(() => {
    getWorker();
  }, []);

  const removeWorker = async (email: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/Worker/delete/${email}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setWorkers(workers?.filter((worker) => worker.email !== email));
    }
  };

  return (
    <Layout>
      <Center>
        <VStack
          divider={<StackDivider />}
          p="4"
          w="100%"
          maxW={{ base: "100vw", sm: "80vw", lg: "70vw", xl: "60vw" }}
          alignItems="stretch"
        >
          <HStack justifyContent="space-between">
            <Heading as="h1" size="2xl" textAlign="center" my={4}>
              Workers
            </Heading>
            <Link to={"/add-worker"}>
              <Button colorScheme="green" leftIcon={<AddIcon />}>
                Create new
              </Button>
            </Link>
          </HStack>
          <Input
            placeholder="Search by name"
            size="sm"
            onChange={(event) => {
              setSearch(event.target.value.toLowerCase());
            }}
          />
          {workers &&
            workers
              .filter((worker) =>
                `${worker.email} ${worker.firstName} ${worker.lastName}`
                  .toLowerCase()
                  .includes(search)
              )
              .sort((w1, w2) => w2.lastUpdate.localeCompare(w1.lastUpdate))
              .map((worker) => (
                <HStack key={worker.id}>
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
                      <Icon as={MdUpdate} w={5} h={5} />
                      <Text as="a">
                        {new Date(worker.lastUpdate).toLocaleDateString()}
                      </Text>
                    </HStack>
                  </VStack>
                  <Spacer />
                  {auth.user?.role == "Admin" && (
                    <>
                      <Button
                        colorScheme="red"
                        onClick={() => removeWorker(worker.email)}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </HStack>
              ))}
          <HStack>
            <Link to={"/register-work"}>
              <Button size="md">Register work</Button>
            </Link>

            <Spacer />

            <Link to={"/register-tack"}>
              <Button size="md">Register reward</Button>
            </Link>
          </HStack>
        </VStack>
      </Center>
    </Layout>
  );
}

export default WorkList;
