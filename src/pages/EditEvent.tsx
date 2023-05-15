import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { ThankEvent, WorkEvent } from "../Common/Types";
import {Heading, StackDivider, VStack, useToast} from "@chakra-ui/react";
import {SubmitHandler} from "react-hook-form";

interface EventProps {
    isThankEvent?: boolean
}

export default function EditEvent({ isThankEvent }: EventProps) {
    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<WorkEvent | ThankEvent>();
    const toast = useToast();
    const fetchThankEvent = async (): Promise<ThankEvent> => {
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
    const fetchWorkEvent = async (): Promise<WorkEvent> => {
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
            if (isThankEvent) {
                const thankEvent = await fetchThankEvent();
                setEvent(thankEvent);
            } else {
                const workEvent = await fetchWorkEvent();
                setEvent(workEvent);
            }
        })()
    }, [isThankEvent]);

    const onSubmit: SubmitHandler<ThankEvent | WorkEvent> = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/Worker`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                foodPref: data.foodPref,
            }),
        });

        if (response.status === 409) {
            toast({
                title: "Error",
                description: "Worker already exists",
                status: "error",
                isClosable: true,
            });
            return;
        }

        toast({
            title: "Success",
            description: "Worker was added successfully",
            status: "success",
            isClosable: true,
        });

        reset();
    };

    return (
        <Layout>
            <Heading as="h1" size="lg" mb={4} textAlign="center">
                {isThankEvent ? "Tackfest" : "Work Event"} {event?.id}
            </Heading>
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

            </VStack>
        </Layout>
    );
}