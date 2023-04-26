import React, { useEffect, useState } from "react";
import { User1, WorkEvent } from "../Common/Types";
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
} from "@chakra-ui/react";

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


  const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<WorkEvent>();

  function handleAddToEvent() {
    throw new Error("Function not implemented.");
  }

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
                        mr={2}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedWorkers([...selectedWorkers, worker.id]);
                          } else {
                            setSelectedWorkers(
                              selectedWorkers.filter((id) => id !== worker.id)
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
      <Select placeholder="Välj event">
        {events &&
          events.map((event) => (
            <option key={event.id}>
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
