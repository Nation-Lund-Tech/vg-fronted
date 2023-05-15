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
  } from "@chakra-ui/react";
  
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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/User/foreman/all`);
      const data: Foreman[] = await response.json();
      setForemen(data);
    };
    useEffect(() => {
      getForemen();
    }, []);
  
    const removeWorker = async (email: string) => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/Worker/delete/${email}`, {
        method: "DELETE",
      });
      if(response.status === 200) {
        setForemen(foremen?.filter((foreman) => foreman.email !== email));
      }
    }
  
    return (
      <Layout>
      <Center>
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
            Foremen
          </Heading>
          <Link to={"/add-foreman"}>
            <Button colorScheme="green" leftIcon={<AddIcon />}>
              Create Foreman
            </Button>
          </Link>
        </HStack>
        <Input 
        placeholder="Search by name"
        size="sm"
        onChange={(event) => {
          setSearch(event.target.value.toLowerCase())
        }} 
        />
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
        {foremen &&
        foremen.filter((worker) => (`${worker.email} ${worker.firstName} ${worker.lastName}`).toLowerCase().includes(search)).map((worker) => (
          <HStack key={worker.id}>
            <Link to={`/arbetare/${worker.id}`}>
              <Text as="a">{`${worker.firstName} ${worker.lastName}`}</Text>
            </Link>
            <Text>{worker.email}</Text>
            <Spacer />
            {auth.user?.role == "Admin" && (
          <>
            <Button colorScheme="red" onClick={() => removeWorker(worker.email)}>Remove</Button>  
          </>
        )}
            </HStack>
          ))}
      </VStack>
      </Center>
      </Layout>
    );
  }
  
  export default Foremen;
  