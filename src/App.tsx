import { Routes, Route } from "react-router-dom";
import AddWorker from "./pages/AddWorker";
import EventList from "./pages/EventList";
import {eventMockData} from "./TestData/TestData";
import {Event} from "./Common/Types";

let events: Event[] = eventMockData;

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
