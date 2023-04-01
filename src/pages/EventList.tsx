import {Box, Center, Grid, GridItem, Heading, HStack, Text} from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import {Event} from '../Common/Types';

interface Props {
    events: Event[]
}

function EventList({events}: Props) {
    return (
        <Center>
            <Box w="48rem">
                <Heading as="h2" size="lg" mb={4}>
                    Tackfester
                </Heading>
                <Accordion allowMultiple>
                    {events.map(event => (
                        <EventItem event={event} key={event.id} />
                    ))}
                </Accordion>
            </Box>
        </Center>
);
}

interface EventItemProps {
    event: Event
}

function EventItem({ event }: EventItemProps){
    return(
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            <HStack spacing='2rem'>
                                <Text as='b'>
                                    {event.name}
                                </Text>
                                <Text as='b'>
                                    {event.date}
                                </Text>
                            </HStack>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                            <PropertiesToGridItem key={event.id} name={"ID"} value={event.id} />
                            <PropertiesToGridItem key={event.capacity} name={"Anmälda"} value={event.participants.length + "/" + event.capacity} />
                            <PropertiesToGridItem key={event.cost} name={"Kostnad"} value={event.cost.toString()} />
                    </Grid>
                </AccordionPanel>
            </AccordionItem>
    );
}

interface PropertiesToGridItemProps {
    name: string;
    value: string;
}

function PropertiesToGridItem({name, value}: PropertiesToGridItemProps) {
    return (
        <GridItem>
            <Text>
                {propertyTranslation.get(name)}: {value}
            </Text>
        </GridItem>
    )
}

let propertyTranslation = new Map<string, string>([
    ["id", "ID"],
    ["name", "Namn"],
    ["date", "Datum"],
    ["cost", "Kostnad"]
]);

export default EventList;
