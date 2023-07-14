import { useParams, Link as RouterLink } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { ThankEvent, WorkEvent } from "../Common/Types";
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, StackDivider, VStack, useToast, Link, Flex, Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import { SubmitHandler, set, useForm } from "react-hook-form";

interface EventInterface {
    event: ThankEvent;
}

interface AddFormThankEvent {
    name: string;
    date: string;
    cost: number;
    foremanEmail: string;
}

export default function AddThankEvent() {
    const { eventId } = useParams<{ eventId: string }>();
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<AddFormThankEvent>();
    const toast = useToast();

    useEffect(() => {
        (async () => {
            setValue("foremanEmail", "gustav@vgtech.com");
        })()
    }, []);

    const onSubmit: SubmitHandler<AddFormThankEvent> = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                date: data.date,
                cost: data.cost,
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
            <Flex justifyContent="center" alignItems="center" p="4">
                <VStack
                    divider={<StackDivider />}
                    p="4"
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
                        <FormControl isInvalid={errors.cost !== undefined}>
                            <FormLabel fontWeight="bold">Cost</FormLabel>
                            <Input
                                id="cost"
                                placeholder="Cost for attending"
                                {...register("cost", {
                                    required: "Cost is required",
                                    min: { value: 0, message: "Cost must be greater than 0" },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.cost && errors.cost.message}
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