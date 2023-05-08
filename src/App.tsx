import WorkList from "./pages/WorkList";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import AddWorkerButton from "./pages/AddWorker";
import { BrowserRouter } from "react-router-dom";
import WorkerForm from "./pages/WorkerForm";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import EventList from "./pages/EventList";
import {Event} from "./Common/Types";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider, RequireAuth } from "./providers/AuthProvider";

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
    <AuthProvider>
      <Routes>
          <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
          <Route path="/add-worker" element={<RequireAuth><AddWorker/></RequireAuth>}/>
          <Route path="/events" element={<RequireAuth><EventList events={events} /></RequireAuth>}/>
          <Route path="/workers" element={<RequireAuth><WorkList/></RequireAuth>}/>
          <Route path="arbetare/:workerId" element={<RequireAuth><WorkerForm/></RequireAuth>}/>
          <Route path="login" element={<Login/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
