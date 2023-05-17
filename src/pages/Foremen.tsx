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

import { MdPerson, MdEmail, MdAttachMoney } from "react-icons/md";
import { Foreman } from "../Common/Types";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../providers/AuthProvider";

function Foremen() {
  const auth = useAuth();
  const [foremen, setForemen] = useState<Foreman[]>();
  const [search, setSearch] = useState<string>("");

  const getForemen = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/User/foreman/all`
    );
    const data: Foreman[] = await response.json();
    setForemen(data);
  };
  useEffect(() => {
    getForemen();
  }, []);

  const removeForeman = async (email: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/User/foreman/${email}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setForemen(foremen?.filter((foreman) => foreman.email !== email));
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
              Foremen
            </Heading>
            <Link to={"/add-foreman"}>
              <Button colorScheme="green" leftIcon={<AddIcon />}>
                Create new
              </Button>
            </Link>
          </HStack>
          <Input
            placeholder="Search by name"
            size="md"
            onChange={(event) => {
              setSearch(event.target.value.toLowerCase());
            }}
          />
          <VStack
            divider={<StackDivider />}
            maxH={["60vh", "48vh"]}
            p="4"
            style={{
              overflowX: "hidden",
              overflowY: "scroll",
            }}
            w="100%"
            maxW={{ base: "100vw", sm: "80vw", lg: "70vw", xl: "60vw" }}
            alignItems="stretch"
          >
            {foremen &&
              foremen
                .filter((foreman) =>
                  `${foreman.email} ${foreman.firstName} ${foreman.lastName}`
                    .toLowerCase()
                    .includes(search)
                )
                .map((foreman) => (
                  <HStack key={foreman.id}>
                    <VStack alignItems={"flex-start"}>
                      <Link to={`/foremen/${foreman.id}`}>
                        <HStack>
                          <Icon as={MdPerson} w={5} h={5} />
                          <Text as="a">{`${foreman.firstName} ${foreman.lastName}`}</Text>
                        </HStack>
                      </Link>
                      <HStack>
                        <Icon as={MdEmail} w={5} h={5} />
                        <Text>{foreman.email}</Text>
                      </HStack>
                    </VStack>
                    <Spacer />
                    {auth.user?.role == "Admin" && (
                      <>
                        <Button
                          colorScheme="red"
                          size={"sm"}
                          onClick={() => removeForeman(foreman.email)}
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </HStack>
                ))}
          </VStack>
        </VStack>
      </Center>
    </Layout >
  );
}

export default Foremen;
