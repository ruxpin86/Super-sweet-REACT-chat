import React from "react";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import "./main.css";

export default function main() {
  return (
    <div className="main">
      <section className="container">
        <div className="signup">
          <Signup />
          <Login />
        </div>
      </section>
    </div>
  );
}
