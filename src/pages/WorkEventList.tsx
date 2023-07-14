import { Box, Center, Heading, Text, Link, Card, CardBody, CardHeader, Flex, Spacer, StackDivider, Icon, HStack, Button } from "@chakra-ui/react";
import { WorkEvent } from "../Common/Types";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link as RouterLink } from "react-router-dom";
import { MdAttachMoney, MdFoodBank } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth } from "../providers/AuthProvider";

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

export default function WorkEventList() {
    const [events, setEvents] = useState<WorkEvent[]>();
    const auth = useAuth();
    useEffect(() => {
        (async () => {
            const workEvents = await fetchWorkEvents();
            setEvents(workEvents);
        })()
    }, []);

    return (
        <Layout>
            <Center justifyContent={"space-evenly"} >
                <Heading as="h1" size="2xl" textAlign="center" my={4}>
                    Work Events
                </Heading>
                {auth.user?.role == "Admin" && (
                    <Link as={RouterLink} to={"/add-work-event"}>
                        <Button colorScheme="green" leftIcon={<AddIcon />}>
                            Create new
                        </Button>
                    </Link>
                )}
            </Center>
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
    const auth = useAuth();
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const workers = event.workers

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Box marginBottom="5px">
            <Link
                as={RouterLink}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                _hover={{ textDecoration: "none" }}
                to={auth.user?.role == "Admin" ? (`/edit-work-event/${String(event.id)}`) : (`/register-work/${String(event.id)}`)}
            >
                <Card variant={isHovered ? "elevated" : "outline"}>
                    <CardHeader>
                        <Flex justifyContent="space-between" >
                            <Box>
                                <Heading size="lg">{event.name}</Heading>
                                <Text>{event.date.slice(0, -9)}</Text>
                                <HStack spacing={"14rem"}>
                                    <HStack>
                                        <Icon as={MdAttachMoney} w={5} h={5} />
                                        <Text as="a">{event.reward ?? "N/A"}</Text>
                                    </HStack>
                                </HStack>
                            </Box>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <HStack>
                            <Text as={"b"}>Workers:</Text>
                            {event.workers.length == 0 && (<Text as={"a"}>N/A</Text>)}
                            {event.workers.length < 4 ? (event.workers.map(worker =>
                                <Text>
                                    {`${worker.firstName} ${worker.lastName},`}
                                </Text>)) : (
                                <Text>
                                    {`${workers[0].firstName} ${workers[0].lastName}, 
                                ${workers[1].firstName} ${workers[1].lastName},
                                ${workers[2].firstName} ${workers[2].lastName} and ${event.workers.length - 3} more`}
                                </Text>)}
                        </HStack>
                    </CardBody>
                </Card>
            </Link>
        </Box>
    );
}