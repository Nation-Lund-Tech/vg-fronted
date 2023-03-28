import { Link as ReachLink } from "react-router-dom";
import {
  Flex as Center,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  var [name, setName] = useState<string>("john");

  const getUsername = async () => {
    const response = await fetch("http://localhost:8080/api/users/1");
    const user = await response.json();
   // const testCompany = await API.companies.getAlltest();
   // setTestCompany(testCompany);
    setName(user.name);
  }

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <Center h="100vh" alignItems="center" justifyContent="center">
      <Center
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder={name}
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button colorScheme="teal" mb={8}>
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            DarkMode
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Center>
    </Center>
  );
};

export default Login;
