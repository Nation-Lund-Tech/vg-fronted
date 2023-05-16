import { useParams, Link as RouterLink } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { ThankEvent } from "../Common/Types";
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, StackDivider, VStack, useToast, Link, Flex, Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import { SubmitHandler, set, useForm } from "react-hook-form";

interface EventInterface {
    event: ThankEvent;
}

interface EditFormThankEvent {
    name: string;
    date: string;
    price: number;
}

export default function EditThankEvent() {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<ThankEvent>();
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<EditFormThankEvent>();
    const toast = useToast();
    const fetchEvent = async (): Promise<ThankEvent> => {
        let thankEvent: ThankEvent;
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent/id/${eventId}`);
            thankEvent = await response.json();
            return thankEvent;
        } catch (error) {
            console.error('Error fetching data:', error);
            return {} as ThankEvent;
        }
    }
    useEffect(() => {
        (async () => {
            const e = await fetchEvent();
            setEvent(e);
            setValue("name", e.name);
            setValue("price", e.price);
            setValue("date", e.date.slice(0, -9));
        })()
    }, []);

    const onSubmit: SubmitHandler<EditFormThankEvent> = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id : event?.id,
                name: data.name,
                date: data.date,
                price: data.price,
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
        if(response.status === 400) {
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                isClosable: true,
            });
            return;
        }
        if(response.status === 404) {
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
                        <FormControl isInvalid={errors.price !== undefined}>
                            <FormLabel fontWeight="bold">Price</FormLabel>
                            <Input
                                id="price"
                                placeholder="Price of the Event"
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 0, message: "Price must be greater than 0" },
                                })}
                                defaultValue={event?.price}
                            />
                            <FormErrorMessage>
                                {errors.price && errors.price.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Spacer p="2" />

                        <HStack justifyContent="space-between">
                            <Button color={"white"} background={"green.400"} type="submit" isLoading={isSubmitting}>
                                Save
                            </Button>
                            <Link to="/thank-events" as={RouterLink}>
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
}