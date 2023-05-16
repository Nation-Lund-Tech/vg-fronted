/* import { useParams, Link as RouterLink } from "react-router-dom";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { WorkEvent } from "../Common/Types";
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, StackDivider, VStack, useToast, Link, Flex, Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface EventInterface {
    event: WorkEvent;
}

export default function EditWorkEvent() {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<WorkEvent>();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<WorkEvent>();
    const toast = useToast();
    const fetchEvent = async (): Promise<WorkEvent> => {
        let WorkEvent: WorkEvent;
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent/id/${eventId}`);
            WorkEvent = await response.json();
            return WorkEvent;
        } catch (error) {
            console.error('Error fetching data:', error);
            return {} as WorkEvent;
        }
    }
    useEffect(() => {
        (async () => {
            const e = await fetchEvent();
            setEvent(e);
        })()
    }, []);

    const onSubmit: SubmitHandler<WorkEvent> = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/Worker`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
        });

        if (response.status === 409) {
            toast({
                title: "Error",
                description: "Event already exists",
                status: "error",
                isClosable: true,
            });
            return;
        }

        toast({
            title: "Success",
            description: "Event added successfully",
            status: "success",
            isClosable: true,
        });

        reset();
    };

    return (
        <Layout>
            <Heading as="h1" size="lg" mb={4} textAlign="center" fontWeight="bold">
                {event?.name} {event?.date.slice(0, -9)}
            </Heading>
            <Flex justifyContent="center" alignItems="center" p="4">
                <VStack
                    divider={<StackDivider />}
                    borderColor="gray.100"
                    borderWidth="2px"
                    p="4"
                    borderRadius="lg"
                    w="100%"
                    maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
                    alignItems="stretch"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={errors.name !== undefined}>
                            <FormLabel fontWeight="bold">Name</FormLabel>
                            <Input
                                id="name"
                                placeholder="Name of the Event"
                                {...register("name", {
                                    required: "Event name is required",
                                })}
                                defaultValue={event?.name}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                            />
                        </FormControl>
                        <FormControl isInvalid={errors.reward !== undefined}>
                            <FormLabel fontWeight="bold">Reward</FormLabel>
                            <Input
                                id="reward"
                                placeholder="Reward for working the event"
                                {...register("reward", {
                                    required: "Work reward is required",
                                })}
                                defaultValue={event?.reward}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Spacer p="2" />

                        <HStack justifyContent="space-between">
                            <Button color={"white"} background={"green.400"} type="submit" isLoading={isSubmitting}>
                                Save
                            </Button>
                            <Link to="/work-events" as={RouterLink}>
                                <Button size='md'>
                                    Back
                                </Button>
                            </Link>
                        </HStack>
                    </form>
                </VStack>
            </Flex>
        </Layout>
    );
} */