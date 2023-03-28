import WorkList from "./pages/WorkList";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import AddWorkerButton from "./pages/AddWorker";
import { BrowserRouter } from "react-router-dom";
import WorkerForm from "./pages/WorkerForm";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";

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
