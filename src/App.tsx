import { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import {BrowserRouter, Route, Link, Routes} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";

export default function App() {
  return (
  <BrowserRouter> 
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
