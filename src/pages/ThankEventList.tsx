import { Box, Center, Heading, Text, Link, Card, CardBody, CardHeader, Flex, Spacer, StackDivider } from "@chakra-ui/react";
import { ThankEvent } from "../Common/Types";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link as RouterLink } from "react-router-dom";

const fetchThankEvents = async (): Promise<ThankEvent[]> => {
  let thankEvents: ThankEvent[];
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent/all`);
    thankEvents = await response.json();
    return thankEvents;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

interface EventItemProps {
  event: ThankEvent;
}

export default function EventList() {
  const [events, setEvents] = useState<ThankEvent[]>();
  useEffect(() => {
    (async () => {
      const thankEvents = await fetchThankEvents();
      setEvents(thankEvents);
    })()
  }, []);

  return (
    <Layout>
      <Center marginTop="1rem">
        <Box width={["100%", "80%"]} alignItems="center" justifyContent="center">
          {events?.map(event => <EventItem event={event} key={event.id} />)}
        </Box>
      </Center>
    </Layout>
  );
}

function EventItem({ event }: EventItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      as={RouterLink}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      _hover={{ textDecoration: "none" }}
      to={`/edit-thank-event/${String(event.id)}`}
    >
      <Card variant={isHovered ? "elevated" : "outline"}>
        <CardHeader>
          <Flex justifyContent="space-between">
            <Box>
              <Heading size="lg">{event.name}</Heading>
              <Text>{event.date.slice(0, -9)}</Text>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          {"Cost: " + event.price}
        </CardBody>
      </Card>
    </Link>
  );
}