import { Box, Center, Heading, Text, Link, Card, CardBody, CardHeader, Flex, Spacer, StackDivider } from "@chakra-ui/react";
import { WorkEvent } from "../Common/Types";
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

interface EventItemProps {
    event: WorkEvent;
}

export default function EventList() {
    const [events, setEvents] = useState<WorkEvent[]>();
    useEffect(() => {
        (async () => {
            const workEvents = await fetchWorkEvents();
            setEvents(workEvents);
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
            to={`/edit-work-event/${String(event.id)}`}
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
                    {"Reward: " + (event.reward ?? "N/A")}
                </CardBody>
            </Card>
        </Link>
    );
}