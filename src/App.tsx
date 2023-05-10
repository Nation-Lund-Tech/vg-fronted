import WorkList from "./pages/WorkList";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import AddWorkerButton from "./pages/AddWorker";
import { BrowserRouter } from "react-router-dom";
import WorkerForm from "./pages/WorkerForm";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import EventList from "./pages/EventList";
import {WorkEvent} from "./Common/Types";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import RegisterWork from "./pages/RegisterWork";
import RegisterTack from "./pages/RegisterTack";
import { AuthProvider, RequireAuth } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
          <Route path="/add-worker" element={<RequireAuth><AddWorker/></RequireAuth>}/>
          <Route path="/events" element={<RequireAuth><EventList /></RequireAuth>}/>
          <Route path="/workers" element={<RequireAuth><WorkList/></RequireAuth>}/>
          <Route path="arbetare/:workerId"/>
          <Route path="login" element={<Login/>}/>
          <Route path="/register-work" element={<RequireAuth><RegisterWork/></RequireAuth>}/>
          <Route path="/register-tack" element={<RequireAuth><RegisterTack/></RequireAuth>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
