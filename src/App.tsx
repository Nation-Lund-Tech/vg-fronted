import WorkList from "./pages/WorkList";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import AddWorkerButton from "./pages/AddWorker";
import { BrowserRouter } from "react-router-dom";
import WorkerForm from "./pages/WorkerForm";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import EventList from "./pages/EventList";

const events = [
    {
        id: '1',
        title: 'Hej1',
        date: '2023-04-01'
    },
    {
        id: '2',
        title: 'Hej2',
        date: '2023-04-02'
    },
    {
        id: '3',
        title: 'Hej3',
        date: '2023-04-03'
    }
];

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <VStack>
            <EventList  events={events}/>
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
