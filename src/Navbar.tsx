import React from "react";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className ="NavigationBar">
            <ul> 
                <li>
                    <Link to="/Home">Home</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;