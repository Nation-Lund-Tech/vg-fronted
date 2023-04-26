import WorkList from "./pages/WorkList";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import AddWorkerButton from "./pages/AddWorker";
import { BrowserRouter } from "react-router-dom";
import WorkerForm from "./pages/WorkerForm";
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import EventList from "./pages/EventList";
import {WorkEvent} from "./Common/Types";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import RegisterWork from "./pages/RegisterWork";
import RegisterTack from "./pages/RegisterTack";

const events: WorkEvent[] = [
    {
      foreman: "Arvid",
      workers: [],
      id: 1,
      name: "Metro",
      date: "23/03/22",
    },
    {
      foreman: "Daniel",
      workers: [],
      id: 2,
      name: "Sopplunch",
      date: "23/03/22",
    },
    {
      foreman: "Hampus",
      workers: [],
      id: 3,
      name: "Metro",
      date: "23/03/22",
    }
];

function App() {
  return (
    <VStack>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
          <Route path="/add-worker" element={<AddWorker/>}/>
          <Route path="/events" element={EventList({events})}/>
          <Route path="/workers" element={<WorkList/>}/>
          <Route path="/arbetare/:workerId" element={<WorkerForm/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register-work" element={<RegisterWork/>}/>
          <Route path="/register-tack" element={<RegisterTack/>}/>
      </Routes>
    </VStack>
  );
}

export default App;
