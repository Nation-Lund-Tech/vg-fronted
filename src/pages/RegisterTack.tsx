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
} from "@chakra-ui/react";

export default function RegisterWork() {
  const [workers, setWorkers] = useState<Worker[]>();

  const getWorker = async () => {
    const response = await fetch(`https://localhost:7008/api/Worker/all`);
    const data: Worker[] = await response.json();
    setWorkers(data);
  };

  // Need to implement a TackEvent in the API

  useEffect(() => {
    getWorker();
  }, []);

  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

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
      <Select maxWidth="26rem" placeholder="Välj tack">
        <option>Anything-but-a-cup | 23/05/24</option>
        <option>Jobbarfest | 23/06/02</option>
      </Select>
      <HStack spacing={"12rem"}>
      <Button colorScheme="green">Register reward</Button>
      <Link href="/workers">
      <Button size='md'>
      Cancel
      </Button>
      </Link>
      </HStack>
    </VStack>
  );
}
