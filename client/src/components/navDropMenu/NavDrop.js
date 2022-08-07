import React from "react";
import "./navDrop.css";
import { useState } from "react";

export default function NavDrop(props) {
  return (
    <div className="nav">
      <nav className="nav-menu">
        <ul className="nav-links">
          <li>
            <a href="">Light/Dark Mode</a>
          </li>
          <li>
            <a href="">+ New Convo</a>
          </li>
          <li>
            <a href="">Another Feature</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
