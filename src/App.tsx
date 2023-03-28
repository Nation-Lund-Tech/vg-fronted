import WorkList from "./WorkList";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import AddWorkerButton from "./AddWorker";
import { BrowserRouter } from "react-router-dom";
import WorkerForm from "./WorkerForm";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./AddWorker";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <VStack>
            <WorkList />
          </VStack>
        }
      />
      <Route 
      path="/add-worker"
      element={<AddWorker/>}/>
    </Routes>
  );
}

export default App;
