import React from "react";
import "./header.css";
import { Cross as Hamburger } from "hamburger-react";

export default function Header() {
  return (
    <div className="header">
      <h4>SUPER SWEET CHAT APP</h4>
      <div>{/* <Hamburger toggled={isOpen} /> */}</div>
    </div>
  );
}
