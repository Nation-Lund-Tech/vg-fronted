import WorkList from "./pages/WorkList";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import AddWorkerButton from "./pages/AddWorker";
import { BrowserRouter } from "react-router-dom";
import WorkerForm from "./pages/WorkerForm";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import EventList from "./pages/EventList";
import {Event} from "./Common/Types";

const events: Event[] = [
    {
        id: '1',
        name: 'Hej1',
        date: '2023-04-01',
        participants: [],
        capacity: 60
    },
    {
        id: '2',
        name: 'Hej2',
        date: '2023-04-02',
        participants: [],
        capacity: 60
    },
    {
        id: '3',
        name: 'Hej3',
        date: '2023-04-03',
        participants: [],
        capacity: 60
    }
];

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <EventList events={events}/>
        }
      />
      <Route 
      path="/add-worker"
      element={<AddWorker/>}/>
    </Routes>
  );
}

export default App;
