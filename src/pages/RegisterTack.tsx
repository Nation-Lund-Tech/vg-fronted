import React, { useEffect, useState } from "react";
import { Worker } from "../Common/Types";
import {
  useCheckbox,
  Input,
  VStack,
  StackDivider,
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
  TableCaption,
  TableContainer,
  Box,
  Checkbox,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { ThankEvent } from "../Common/Types";

export default function RegisterWork() {
  const [workers, setWorkers] = useState<Worker[]>();
  const [events, setEvents] = useState<ThankEvent[]>([]);

  const toast = useToast();

  const getWorker = async () => {
    const response = await fetch(`https://localhost:7008/api/Worker/all`);
    const data: Worker[] = await response.json();
    setWorkers(data);
  };

  const getEvents = async () => {
    const response = await fetch(`https://localhost:7008/api/ThankEvent/all`);
    const data: ThankEvent[] = await response.json();
    setEvents(data);
  };

  // Need to implement a TackEvent in the API

  useEffect(() => {
    getWorker();
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number>();

  const handleSelectEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = parseInt(e.target.value);
    setSelectedEventId(eventId);
  };

  const handleAddToEvent = async () => {
    if (!selectedEventId) {
      // Show an error message if no event is selected
      return;
    }

    const response = await fetch(
      `https://localhost:7008/api/ThankEvent/add/worker`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedWorkers[0],
          eventId: selectedEventId,
        }),
      }
    );

    if (response.ok) {
      // Show a success message if the request was successful
      // alert("Workers added to event successfully");
      toast({
        title: "Success",
        description: "Worker was added to ThankEvent",
        status: "success",
        isClosable: true,
      });
      setSelectedWorkers([]);
    } else {
      // Show an error message if the request failed
      toast({
        title: "Failure",
        description: "Worker could not be added to ThankEvent",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={"1rem"}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Namn</Th>
              <Th>Email</Th>
              <Th>Matpref</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workers &&
              workers.map((worker) => (
                <Tr key={worker.email}>
                  <Td>
                    <Flex alignItems="center">
                      <Checkbox
                        defaultChecked={false}
                        isChecked={selectedWorkers.includes(worker.email)}
                        mr={2}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const newVal = [...selectedWorkers, worker.email];
                            setSelectedWorkers(newVal);
                            console.log(newVal);
                          } else {
                            setSelectedWorkers(
                              selectedWorkers.filter(
                                (email) => email !== worker.email
                              )
                            );
                          }
                        }}
                      />
                      <Box>
                        {worker.firstName} {worker.lastName}
                      </Box>
                    </Flex>
                  </Td>
                  <Td>{worker.email}</Td>
                  <Td>{worker.foodPref}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer />
      <Select
        maxWidth="26rem"
        placeholder="Välj tack"
        onChange={(e) => handleSelectEvent(e)}
      >
        {events &&
          events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
      </Select>
      <HStack spacing={"12rem"}>
        <Button colorScheme="green" onClick={handleAddToEvent}>Registrera tack</Button>
        <Link href="/workers">
          <Button size="md">Cancel</Button>
        </Link>
      </HStack>
    </VStack>
  );
}
