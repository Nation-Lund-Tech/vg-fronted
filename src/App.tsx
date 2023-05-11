import WorkList from "./pages/WorkList";
import WorkerForm from "./pages/WorkerForm";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import EventList from "./pages/EventList";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterWork from "./pages/RegisterWork";
import RegisterTack from "./pages/RegisterTack";
import { AuthProvider, RequireAuth } from "./providers/AuthProvider";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
          <Route path="/add-worker" element={<RequireAuth><AddWorker/></RequireAuth>}/>
          <Route path="/thank-events" element={<RequireAuth><EventList thankEvent={true} /></RequireAuth>}/>
          <Route path="/work-events" element={<RequireAuth><EventList /></RequireAuth>}/>
          <Route path="/workers" element={<RequireAuth><WorkList/></RequireAuth>}/>
          <Route path="arbetare/:workerId" element={<RequireAuth><WorkerForm/></RequireAuth>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/register-work" element={<RequireAuth><RegisterWork/></RequireAuth>}/>
          <Route path="/register-tack" element={<RequireAuth><RegisterTack/></RequireAuth>}/>
          <Route path="/edit-event/:eventId" element={<RequireAuth><EditEvent/></RequireAuth>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
