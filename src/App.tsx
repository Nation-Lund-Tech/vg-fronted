import WorkList from "./pages/WorkList";
import WorkerForm from "./pages/WorkerForm";
import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import ThankEventList from "./pages/ThankEventList";
import WorkEventList from "./pages/WorkEventList";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterWork from "./pages/RegisterWork";
import RegisterTack from "./pages/RegisterTack";
import { AuthProvider, RequireAuth } from "./providers/AuthProvider";
import EditThankEvent from "./pages/EditThankEvent";
import EditWorkEvent from "./pages/EditWorkEvent";
import Foremen from "./pages/Foremen";
import AddForeman from "./pages/AddForeman";
import UpdateWorker from "./pages/UpdateWorker";
import ForemanProfile from "./pages/ForemanProfile";
import UpdateForeman from "./pages/UpdateForeman";

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="/" element={<RequireAuth><Home/></RequireAuth>} />
          <Route path="/add-worker" element={<RequireAuth><AddWorker/></RequireAuth>}/>
          <Route path="/update-worker/:workerId" element={<RequireAuth><UpdateWorker/></RequireAuth>}/>
          <Route path="/thank-events" element={<RequireAuth><ThankEventList /></RequireAuth>}/>
          <Route path="/work-events" element={<RequireAuth><WorkEventList /></RequireAuth>}/>
          <Route path="/edit-thank-event/:eventId" element={<RequireAuth><EditThankEvent /></RequireAuth>}/>
          <Route path="/edit-work-event/:eventId" element={<RequireAuth><EditWorkEvent /></RequireAuth>}/>
          <Route path="/add-foreman" element={<RequireAuth><AddForeman/></RequireAuth>}/>
          <Route path="/workers" element={<RequireAuth><WorkList/></RequireAuth>}/>
          <Route path="/workers/:workerId" element={<RequireAuth><WorkerForm/></RequireAuth>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/register-work" element={<RequireAuth><RegisterWork/></RequireAuth>}/>
          <Route path="/register-tack" element={<RequireAuth><RegisterTack/></RequireAuth>}/>
          <Route path="/update-foreman" element = {<RequireAuth><UpdateForeman/></RequireAuth>}/>
          <Route path="/foremen/:foremanId" element = {<RequireAuth><ForemanProfile/></RequireAuth>}/>
          <Route path="/foremen" element={<RequireAuth><Foremen/></RequireAuth>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
