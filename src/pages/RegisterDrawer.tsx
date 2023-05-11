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
} from "@chakra-ui/react";
import { WorkEvent, Worker } from "../Common/Types";
import Layout from "../components/Layout";

interface Props {
  isOpen: boolean;
  close: () => void;
  worker : Worker;
}

function RegisterDrawer({ isOpen, close, worker }: Props) {
  const [events, setEvents] = useState<WorkEvent[]>();

  const [selectedEventId, setSelectedEventId] = useState<number>();

  const getEvents = async () => {
    const response = await fetch(`https://localhost:7008/api/WorkEvent/all`);
    const data: WorkEvent[] = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const { onOpen, onClose } = useDisclosure();
  const firstField = useRef(null);

  const handleAddToEvent = async () => {
    if (!selectedEventId) {
      // Show an error message if no event is selected
      alert("Please select an event");
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
      alert("Workers added to event successfully");
    } else {
      // Show an error message if the request failed
      alert("Failed to add workers to event");
    }
  };

  function handleSelectEvent(e: ChangeEvent<HTMLSelectElement>) {
    const id = parseInt(e.target.value);
    setSelectedEventId(id);
    console.log(id);
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
            <DrawerHeader>Registera pass</DrawerHeader>

            <DrawerBody>
              <Select
                placeholder="Välj event"
                width="100%"
                onChange={(e) => {
                  handleSelectEvent(e);
                }}
              >
                {events &&
                  events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} - {new Date(event.date).toLocaleDateString()}{" "}
                      -{" "}
                      {event.foreman.length !== 0
                        ? event.foreman[0].firstName
                        : "No foreman"}{" "}
                      {event.workers.length} workers
                    </option>
                  ))}
              </Select>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Avbryt
              </Button>
              <Button colorScheme="blue" onClick={handleAddToEvent}>Spara</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    
  );
}

export default RegisterDrawer;
