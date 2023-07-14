import { useParams, Link as RouterLink } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { WorkEvent } from "../Common/Types";
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, StackDivider, VStack, useToast, Link, Flex, Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { Text } from "@chakra-ui/react";

interface EventInterface {
    event: WorkEvent;
}

interface EditFormWorkEvent {
    name: string;
    date: string;
    reward: number;
    foremanEmail: string;
}

export default function EditWorkEvent() {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<WorkEvent>();
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<EditFormWorkEvent>();
    const toast = useToast();
    const fetchEvent = async (): Promise<WorkEvent> => {
        let workEvent: WorkEvent;
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent/id/${eventId}`);
            workEvent = await response.json();
            return workEvent;
        } catch (error) {
            console.error('Error fetching data:', error);
            return {} as WorkEvent;
        }
    }
    useEffect(() => {
        (async () => {
            const e = await fetchEvent();
            setEvent(e);
            setValue("name", e.name);
            setValue("date", e.date.slice(0, -9));
            setValue("reward", e.reward);
            setValue("foremanEmail", "gustav@vgtech.com");
        })()
    }, []);

    const removeEvent = async (id: string) => {

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent/delete/id/${id}`, {
            method: "DELETE",
        });
        if (response.status === 200) {

        }
    };


    const onSubmit: SubmitHandler<EditFormWorkEvent> = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: event?.id,
                name: data.name,
                date: data.date,
                reward: data.reward,
                foremanEmail: "gustav@vgtech.com",
            }),
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
        if (response.status === 400) {
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                isClosable: true,
            });
            return;
        }
        if (response.status === 404) {
            toast({
                title: "Error",
                description: "Not found",
                status: "error",
                isClosable: true,
            });
            return;
        }

        toast({
            title: "Success",
            description: "Event Updated successfully",
            status: "success",
            isClosable: true,
        });
        setEvent(await fetchEvent())
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
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold">Date</FormLabel>
                            <Input
                                id="date"
                                {...register("date", {
                                    valueAsDate: true,
                                    required: "Event date is required",
                                })}
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                            />
                            <FormErrorMessage>
                                {errors.date && errors.date.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={errors.reward !== undefined}>
                            <FormLabel fontWeight="bold">Reward</FormLabel>
                            <Input
                                id="reward"
                                placeholder="Reward for working"
                                {...register("reward", {
                                    required: "Reward is required",
                                    min: { value: 0, message: "Reward must be greater than 0" },
                                })}
                                defaultValue={event?.reward}
                            />
                            <FormErrorMessage>
                                {errors.reward && errors.reward.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Spacer p="2" />

                        <HStack spacing="2rem">
                            <Link to="/work-events" as={RouterLink}>
                                <Button colorScheme="red" size={"md"} onClick={() => removeEvent(String(eventId))}>Remove</Button>
                            </Link>
                            <Spacer />
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
                    <Text as={"b"}>Workers:</Text>
                    {event?.workers.length == 0 ? (<Text as={"a"}>N/A</Text>) : (
                        event?.workers.map(worker =>
                            <Text>
                                {`${worker.firstName} ${worker.lastName}  `}
                            </Text>))}
                </VStack>
            </Flex>
        </Layout>
    );
}