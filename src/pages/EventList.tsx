import {Box, Center, Heading} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { WorkEvent} from "../Common/Types";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

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
        <Box width="100%" alignItems="center" justifyContent="center">
          <Heading as="h2" size="lg" mb={4} textAlign="center">
            Händelser
          </Heading>
          <Accordion allowMultiple>
            {events?.map((event) => (
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
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {event.date} - {event.foreman} - {event.name} - {event.workers.length}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  );
}
