import Layout from "../components/Layout"
import { Heading } from "@chakra-ui/react";

const Home = () => {
  return <Layout>
    <Heading as="h1" size="2xl" textAlign="center" my={4}>
      Welcome to Västgöta Nation!
    </Heading>
  </Layout>;
};

export default Home;