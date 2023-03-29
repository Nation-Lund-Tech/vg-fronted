import { Box, Heading, List, ListItem } from '@chakra-ui/react';

interface Event {
    id: string;
    title: string;
    date: string;
}

interface Props {
    events: Event[];
}

const EventList: React.FC<Props> = ({ events }) => {
    return (
        <Box>
            <Heading as="h2" size="lg" mb={4}>
        Events
        </Heading>
        <List spacing={3}>
        {events.map(event => (
                <ListItem key={event.id}>{event.title}</ListItem>
            ))}
        </List>
        </Box>
);
};

export default EventList;
