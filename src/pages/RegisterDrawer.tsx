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
import { WorkEvent, Worker } from "../Common/Types";
import Layout from "../components/Layout";

interface Props {
  isOpen: boolean;
  close: () => void;
  worker: Worker;
}

function RegisterDrawer({ isOpen, close, worker }: Props) {
  const [events, setEvents] = useState<WorkEvent[]>();

  const [selectedEventId, setSelectedEventId] = useState<number>();

  const getEvents = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent/all`);
    const data: WorkEvent[] = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const toast = useToast();

  const firstField = useRef(null);

  const handleAddToEvent = async () => {
    if (!selectedEventId) {
      // Show an error message if no event is selected
      toast({
        title: "Failure",
        description: "No event selected",
        status: "error",
        isClosable: true,
      });
      return;
    }

    // Check if email is part of the workers array in the event
    const event = events?.find((event) => event.id === selectedEventId);
    if (event?.workers.find((w) => w.email === worker.email)) {
      // Show an error message if the worker is already part of the event
      toast({
        title: "Failure",
        description: "Worker is already part of the event",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const response = await fetch(
      `https://localhost:7008/api/WorkEvent/add/worker`,
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
      getEvents();
      toast({
        title: "Success",
        description: "Worker was added successfully",
        status: "success",
        isClosable: true,
      });
    } else {
      // Show an error message if the request failed
      // alert("Failed to add workers to event");
      toast({
        title: "Failure",
        description: "Worker could not be added",
        status: "error",
        isClosable: true,
      });
    }
  };

  function handleSelectEvent(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = parseInt(e.target.value);
    setSelectedEventId(id);
    console.log(e.target.value);  
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={close}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Register workshift</DrawerHeader>

          <DrawerBody>
            <Select placeholder="Välj event" width="100%" onChange={(e) => {handleSelectEvent(e)}}
            >
              {events &&
                events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} - {new Date(event.date).toLocaleDateString()} -{" "}
                    {/* {event.foreman.length !== 0 ? event.foreman[0].firstName : "No foreman"}{" "}  */}
                    {event.workers.length} workers
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

export default RegisterDrawer;
