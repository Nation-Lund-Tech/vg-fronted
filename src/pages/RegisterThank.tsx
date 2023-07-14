import React, { useEffect, useState } from "react";
import { ThankEvent, Worker, WorkEvent } from "../Common/Types";
import {
    VStack,
    Button,
    HStack,
    Link,
    Spacer,
    Text,
    Select,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Checkbox,
    Flex,
    CloseButton,
    Center,
    useToast,
    Heading,
    Input,
    StackDivider,
    Icon,
} from "@chakra-ui/react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { get, set } from "react-hook-form";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { MdPerson, MdEmail, MdAttachMoney, MdUpdate } from "react-icons/md";
import { useAuth } from "../providers/AuthProvider";

export default function RegisterWork() {
    const { eventId } = useParams<{ eventId: string }>();
    const [workers, setWorkers] = useState<Worker[]>();
    const [event, setEvent] = useState<ThankEvent>();
    const auth = useAuth();

    const getWorkers = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/Worker/all`);
        const data: Worker[] = await response.json();
        setWorkers(data);
    };


    const getEvent = async () => {
        let thankEvent: ThankEvent;
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent/id/${eventId}`);
            thankEvent = await response.json();
            setEvent(thankEvent);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getWorkers();
        getEvent();
    }, []);

    const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

    const toast = useToast();
    const [search, setSearch] = useState<string>("");

    const removeWorker = async (email: string) => {

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent/delete/worker`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                eventId: event?.id,
            }),
        });
        if (response.status === 200) {
            toast({
                title: "Success",
                description: "Worker was removed successfully",
                status: "success",
                isClosable: true,
            });
            getEvent()
        }
    };

    const registerWorker = async (email: string) => {

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent/add/participant`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                eventId: event?.id,
            }),
        });
        if (response.status === 200) {
            toast({
                title: "Success",
                description: "Worker was added successfully",
                status: "success",
                isClosable: true,
            });
            getEvent()
        }
        if (response.status === 400) {
            toast({
                title: "Failure",
                description: "Something went wrong",
                status: "error",
                isClosable: true,
            });
            getEvent()
        }
    };

    return (
        <Layout>
            <Center>
                <VStack
                    divider={<StackDivider />}
                    p="4"
                    w="100%"
                    maxW={{ base: "100vw", sm: "80vw", lg: "70vw", xl: "60vw" }}
                    alignItems="stretch"
                >
                    <HStack justifyContent="space-between">
                        <Heading as="h1" size="2xl" textAlign="center" my={4}>
                            {event?.name} {event?.date?.slice(0, -9)}
                        </Heading>
                    </HStack>
                    <Input
                        placeholder="Search by name or email"
                        size="md"
                        onChange={(event) => {
                            setSearch(event.target.value.toLowerCase())
                        }}
                    />

                    <VStack
                        divider={<StackDivider />}
                        maxH={["60vh", "48vh"]}
                        p="4"
                        style={{
                            overflowX: "hidden",
                            overflowY: "scroll",
                        }}
                        w="100%"
                        maxW={{ base: "100vw", sm: "80vw", lg: "70vw", xl: "60vw" }}
                        alignItems="stretch"
                    >

                        {workers &&
                            workers.filter((worker) =>
                                (`${worker.email} ${worker.firstName} ${worker.lastName}`)
                                    .toLowerCase()
                                    .includes(search))
                                .sort((w1, w2) => w2.lastUpdate.localeCompare(w1.lastUpdate))
                                .map((worker) => (
                                    <HStack key={worker.id}>
                                        <VStack alignItems="flex-start">
                                            <Link as={RouterLink} to={`/workers/${worker.id}`}>
                                                <HStack>
                                                    <Icon as={MdPerson} w={5} h={5} />
                                                    <Text as="a">{`${worker.firstName} ${worker.lastName}`}</Text>
                                                </HStack>
                                            </Link>
                                            <HStack>
                                                <Icon as={MdEmail} w={5} h={5} />
                                                <Text as="a">{worker.email}</Text>
                                            </HStack>
                                            <HStack>
                                                <Icon as={MdAttachMoney} w={5} h={5} />
                                                <Text as="a">{worker.bank}</Text>
                                            </HStack>
                                        </VStack>
                                        <Spacer />
                                        {event?.particpants?.map(w => w.email).includes(worker.email) ? (
                                            <>
                                                <Button colorScheme="red" size={"sm"} onClick={() => removeWorker(worker.email)}>Unregister</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button colorScheme="green" size={"sm"} onClick={() => registerWorker(worker.email)}>Register</Button>
                                            </>
                                        )}
                                    </HStack>
                                ))}
                    </VStack>
                    <HStack>
                        <Text as={"b"}>{`Participants:`}</Text>
                        <Text as={"i"}>{`${event?.particpants.length}/${event?.capacity}`}</Text>
                        <Spacer />
                        <Link href="/thank-events">
                            <Button size="md">Cancel</Button>
                        </Link>
                    </HStack>
                    {event?.particpants?.map(worker =>
                        <Text>
                            {`${worker.firstName} ${worker.lastName}  `}
                        </Text>)}
                </VStack>
            </Center>
        </Layout>
    );
}
