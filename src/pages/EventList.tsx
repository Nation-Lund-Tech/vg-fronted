import { Box, Center, Heading, Text, SimpleGrid, Button, Link } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { WorkEvent, ThankEvent } from "../Common/Types";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link as RouterLink } from "react-router-dom";

const fetchWorkEvents = async (): Promise<WorkEvent[]> => {
  let workEvents: WorkEvent[];
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent/all`);
    workEvents = await response.json();
    return workEvents;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

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


interface EventListProps {
  thankEvent?: boolean
}

export default function EventList({ thankEvent = false }: EventListProps) {
  const [events, setEvents] = useState<WorkEvent[] | ThankEvent[]>();
  useEffect(() => {
    (async () => {
      if (thankEvent) {
        const thankEvents = await fetchThankEvents();
        setEvents(thankEvents);
      } else {
        const workEvents = await fetchWorkEvents();
        setEvents(workEvents);
      }
    })()
  }, []);

  return (
    <Layout>
      <Center>
        <Box width={["100%", "80%"]} alignItems="center" justifyContent="center">
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            {thankEvent ? "Tackfester" : "Work Events"}
          </Heading>
          <Accordion allowMultiple>
            {events?.map(event => <EventItem event={event} thankEvent={thankEvent} key={event.id} />)}
          </Accordion>
        </Box>
      </Center>
    </Layout>
  );
}

interface EventItemProps {
  event: WorkEvent | ThankEvent;
}

function EventItem({ event, thankEvent = false }: EventItemProps & EventListProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: 'whiteSmoke' }}>
          <Box as="span" flex="1" textAlign="left">
            {event.date.slice(0, -9)} - {event.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {thankEvent ? <PanelContentThankEvent event={event as ThankEvent} /> : <PanelContentWorkEvent event={event as WorkEvent} />}
      </AccordionPanel>
    </AccordionItem>
  );
}

interface WorkEventItemProps {
  event: WorkEvent;
}

function PanelContentWorkEvent({ event }: WorkEventItemProps) {
  return (
    <SimpleGrid columns={2} spacing={10}>
      <Box>Name: {event.name}</Box>
      <Box>Date: {event.date.slice(0, -9)}</Box>
      <Box>Reward: {event.reward} VG-bucks</Box>
      <Box>
        <Link as={RouterLink} to={`/edit-event/${String(event.id)}`}>
          <Button size="sm">Open</Button>
        </Link>
      </Box>
    </SimpleGrid>
  );
}

interface ThankEventItemProps {
  event: ThankEvent;
}

function PanelContentThankEvent({ event }: ThankEventItemProps) {
  return (
    <SimpleGrid columns={2} spacing={10}>
      <Box>Name: {event.name}</Box>
      <Box>Date: {event.date.slice(0, -9)}</Box>
      <Box>Cost: {event.price} VG-bucks</Box>
      <Box>
        <Link as={RouterLink} to={`/edit-event/${String(event.id)}`}>
          <Button size="sm">Open</Button>
        </Link>
      </Box>
    </SimpleGrid>
  );
}