import React, { ChangeEvent, useEffect, useState } from "react";
import { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useDisclosure,
  Select,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { WorkEvent, ThankEvent, Worker } from "../Common/Types";
import Layout from "../components/Layout";

interface Props {
  isOpen2: boolean;
  close: () => void;
  worker: Worker;
}

function RegisterThankDrawer({ isOpen2, close, worker }: Props) {
  const [events, setEvents] = useState<ThankEvent[]>();
  const foodTicketCost = 1;

  const [selectedEventId, setSelectedEventId] = useState<number>();

  const getThankEvents = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent/all`);
    const data: ThankEvent[] = await response.json();
    setEvents(data);
    console.log(data);
  };

  useEffect(() => {
    getThankEvents();
  }, []);

  const toast = useToast();

  const firstField = useRef(null);

  const handleAddToEvent = async () => {
    if (!selectedEventId) {
      // Show an error message if no event is selected
      toast({
        title: "Failure",
        description: "No reward selected",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if(selectedEventId === -1) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/ThankEvent/food-ticket`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: worker.email,
          }),
        }
      );

      if (response.ok) {
        // Show a success message if the request was successful
        // alert("Workers added to event successfully");
        toast({
          title: "Success",
          description: "Purchase went through successfully",
          status: "success",
          isClosable: true,
        });
      } else {
        // Show an error message if the request failed
        // alert("Failed to add workers to event");
        toast({
          title: "Failure",
          description: "Purschase could not be done",
          status: "error",
          isClosable: true,
        });
      }

    }

    // Check if email is part of the workers array in the event
    const event = events?.find((event) => event.id === selectedEventId);

    if (event) {
     
      const isParticipant = event.particpants.some(
        (participant) => participant.email === worker.email
      );
      if (isParticipant) {
        // Show an error message if the worker is already part of the event
        toast({
          title: "Failure",
          description: "Participant is already part of the event",
          status: "error",
          isClosable: true,
        });
        return;
      }

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/ThankEvent/add/participant`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: worker.email,
          eventId: selectedEventId,
        }),
      }
    );

    if (response.ok) {
      // Show a success message if the request was successful
      // alert("Workers added to event successfully");
      toast({
        title: "Success",
        description: "Participant was added successfully",
        status: "success",
        isClosable: true,
      });
    } else {
      // Show an error message if the request failed
      // alert("Failed to add workers to event");
      toast({
        title: "Failure",
        description: "Participant could not be added",
        status: "error",
        isClosable: true,
      });
    }
  }
  };

  function handleSelectEvent(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = parseInt(e.target.value);
    setSelectedEventId(id);
    console.log(e.target.value);
  }

  return (
    <Drawer
      isOpen={isOpen2}
      placement="right"
      initialFocusRef={firstField}
      onClose={close}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Register reward</DrawerHeader>

          <DrawerBody>
            <Select
              placeholder="Choose event"
              width="100%"
              onChange={(e) => {
                handleSelectEvent(e);
              }}
            >
              <option value={-1} key={-1}>
              {`Food Ticket - $${foodTicketCost}`}
              </option>
              {events &&
                events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {`${event.name} - ${new Date(event.date).toLocaleDateString()} - ${event.particpants.length}/${event.capacity} - $${event.cost}`}
                  </option>
                ))}
            </Select>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="green" onClick={handleAddToEvent}>
              Save
            </Button>
            <Spacer />
            <Button variant="outline" mr={3} onClick={close}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default RegisterThankDrawer;