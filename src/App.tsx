import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {BrowserRouter, Route, Link} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div></div>
      <h1>VästGöta Nation front end</h1>
      <div className="card">
        <p>Development of front end at VästGöta Nation</p>
      </div>
    </div>
  );
}

export default App;
