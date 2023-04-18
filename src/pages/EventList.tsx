import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import {Event, User} from '../Common/Types';

interface Props {
    events: Event[]
}

function EventList({events}: Props) {
    return (
        <Box>
            <Heading as="h2" size="lg" mb={4}>
        Tackfester
        </Heading>
            <Accordion allowMultiple>
        {events.map(event => (
            <EventItem event={event} key={event.id} />
        ))}
        </Accordion>
        </Box>
);
};

interface EventItemProps {
    event: Event
}

function EventItem({ event }: EventItemProps){
    return(
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            {event.date}
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

export default EventList;