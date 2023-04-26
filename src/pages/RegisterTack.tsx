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
  const [selectedDateTime, setSelectedDateTime] = useState("");

  function handleAddToEvent() {
    // Call an API endpoint to add the selected workers to the event on the selected date and time
    console.log(
      `Adding workers ${selectedWorkers} to event on ${selectedDateTime}`
    );
  }

  return (
    <VStack>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Jobbare</TableCaption>
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
                      <Checkbox defaultChecked={false} mr={2} />
                      <Box>
                        {worker.firstName} {worker.lastName}
                      </Box>
                    </Flex>
                  </Td>
                  <Td>{worker.email}</Td>
                  <Td>lägg till matpref</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer />
      <Select placeholder="Välj tackfest">
        <option>Anything-but-a-cup | 23/05/24</option>
        <option>Jobbarfest | 23/06/02</option>
      </Select>
      <Button onClick={handleAddToEvent} colorScheme="green">
        Registrera pass
      </Button>
    </VStack>
  );
}
