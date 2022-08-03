import React from "react";
import Signup from "../signup/Signup";
import "./main.css";

export default function main() {
  return (
    <div>
      <section className="container">
        <div className="signup">
          <Signup />
        </div>
      </section>
    </div>
  );
}
