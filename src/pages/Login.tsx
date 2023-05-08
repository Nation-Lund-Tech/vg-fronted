import { Link as ReachLink, useLocation, useNavigate } from "react-router-dom";
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
  getToken,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import Layout from "../components/Layout";

const Login = () => {
  const { user, signin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  var [email, setEmail] = useState<string>("");
  var [passwd, setPasswd] = useState<string>("");

  const from = location.state?.from || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  const onLogin = async () => {
    const response = await fetch("https://localhost:7008/api/Auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: passwd })
    })

    const token = await response.text();

    if (token) {
      signin(token);
    }

  }

  /*const getUsername = async () => {
    const response = await fetch("https://localhost:7008/api/User/1");
    const user = await response.json();
   // const testCompany = await API.companies.getAlltest();
   // setTestCompany(testCompany);
    setName(user.firstName);
  }

  useEffect(() => {
    getUsername();
  }, []);
  */
  return (
    <Layout>
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
            placeholder={"example@mail.com"}
            type="email"
            variant="filled"
            mb={3}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
            onChange={(event) => setPasswd(event.target.value)}
          />
          <Button onClick={onLogin} colorScheme="teal" mb={8}>
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
    </Layout>
  );
};

export default Login;
