import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Foreman, User } from "../Common/Types";
import { VStack, StackDivider, Flex, Spacer, Button, Heading, Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
import RegisterDrawer from "./RegisterDrawer";

function ForemanProfile() {
  const { foremanId } = useParams<{ foremanId: string }>();

  const [foreman, setForeman] = useState<User>();

  const getForeman = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/User/${foremanId}`
    );
    const data: User = await response.json();
    setForeman(data);
  };

  useEffect(() => {
    getForeman();
  }, []);

  return (  <Layout>
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
            {foreman?.firstName} {foreman?.lastName}
            <br />
            {foreman?.email}
          </Box>
          <Spacer />
          <Link to={"/update-foreman"}>
            <Button>Uppdatera</Button>
          </Link>
          {/* <Button onClick={onOpen}>Lägg till pass</Button>
          <RegisterDrawer isOpen={isOpen} close={onClose} foreman={foreman!} /> */}
        </Flex>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="sm">
              Total användbar tacksumma: 
            </Heading>
            <Spacer />
            <Heading size="sm">
              {foreman && `Totalt tack:`}
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

export default ForemanProfile;
