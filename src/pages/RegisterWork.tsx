import React, { useEffect, useState } from "react";
import { User1, WorkEvent } from "../Common/Types";
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
} from "@chakra-ui/react";
import { set } from "react-hook-form";

export default function RegisterWork() {
  const [workers, setWorkers] = useState<User1[]>();
  const [events, setEvents] = useState<WorkEvent[]>();

  const getWorker = async () => {
    const response = await fetch(`https://localhost:7008/api/Worker/all`);
    const data: User1[] = await response.json();
    setWorkers(data);
  };

  const getEvents = async () => {
    const response = await fetch(`https://localhost:7008/api/WorkEvent/all`);
    const data: WorkEvent[] = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    getWorker();
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>();

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
          workerEmails: selectedWorkers,
          eventId: selectedEventId,
        }),
      }
    );

    if (response.ok) {
      // Show a success message if the request was successful
      alert("Workers added to event successfully");
      setSelectedWorkers([]);
    } else {
      // Show an error message if the request failed
      alert("Failed to add workers to event");
    }
  };

  const handleSelectEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(event.target.value);
  };

  return (
    <VStack>
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
                <Tr key={worker.id}>
                  <Td>
                    <Flex alignItems="center">
                      <Checkbox
                        defaultChecked={false}
                        isChecked={selectedWorkers.includes(worker.email)}
                        mr={2}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const newVal = [
                              ...selectedWorkers,
                              worker.email,
                            ]
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
        placeholder="Välj event" onChange={(e) => {handleSelectEvent(e)}}>
        {events &&
          events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - {new Date(event.date).toLocaleDateString()} -{" "}
              {event.foreman ? event.foreman : "No foreman"}
            </option>
          ))}
      </Select>
      <Button onClick={handleAddToEvent} colorScheme="green">
        Registrera pass
      </Button>
    </VStack>
  );
}