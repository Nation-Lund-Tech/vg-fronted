import { Box, Center, Heading, Text, SimpleGrid, Button, Link } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { WorkEvent } from "../Common/Types";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link as RouterLink } from "react-router-dom";

export default function EventList() {
  const [events, setEvents] = useState<WorkEvent[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent/all`);
        const workEvents: WorkEvent[] = await response.json();
        setEvents(workEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <Center>
        <Box width={["100%", "80%"]} alignItems="center" justifyContent="center">
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Händelser
          </Heading>
          <Accordion allowMultiple>
            {events?.map((event) => (
              <EventItem event={event} key={event.id} />
              <EventItem event={event} key={event.id} />
            ))}
          </Accordion>
        </Box>
      </Center>
    </Layout>
  );
}

interface EventItemProps {
  event: WorkEvent;
}

function EventItem({ event }: EventItemProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: 'whiteSmoke' }}>
          <Box as="span" flex="1" textAlign="left">
            {event.date.slice(0, -9)}
            - {event.name}
            - {/* {event.foreman && event.foreman.map(foreman => <Text>{foreman.firstName} {foreman.lastName} ,</Text>)} / */}
            {event.workers.length}

          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <AccordionPanelContent event={event} />
      </AccordionPanel>
    </AccordionItem>
  );
}

function AccordionPanelContent({ event }: EventItemProps) {
  return (
    <SimpleGrid columns={2} spacing={10}>
      <Box>Namn: {event.name}</Box>
      <Box>Datum: {event.date.slice(0, -9)}</Box>

      {/* <Box>Ansvariga förmän: {event.foreman.map(foreman => <text>{foreman.firstName} {foreman.lastName}, </text>)}</Box> */}

      <Box>Personal: {event.workers.map(worker => <text>{worker.firstName} {worker.lastName}, </text>)}</Box>
    </SimpleGrid>
  );
}