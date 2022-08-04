import React from "react";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import "./main.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function main() {
  return (
    <div className="main">
      <section className="container">
        <div className="buttons">
          <Signup />
          <Login />
          {/* <Routes>
            <Route exact path="/chat" element={<Signup />} />
            <Route exact path="/chat" element={<Login />} />
          </Routes> */}
        </div>
      </section>
    </div>
  );
}
