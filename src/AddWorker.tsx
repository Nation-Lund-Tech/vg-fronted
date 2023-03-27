import { HStack, Input, Button } from "@chakra-ui/react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import WorkerFrom from "./WorkerForm";

function AddWorker() {
  const navigate = useNavigate();

  function handleClick() {
   // navigate("/workerform");
  }

  return (
    <HStack>
      <Button onClick={handleClick}>Add worker</Button>
    </HStack>
  );
}

export default AddWorker;
