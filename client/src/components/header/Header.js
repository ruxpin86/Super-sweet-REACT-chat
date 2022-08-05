import React, { useState } from "react";
import "./header.css";
import { Cross as Hamburger } from "hamburger-react";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="header">
      <div className="logout-wrap">
        <button className="logout-btn">LOGOUT</button>
      </div>
      <h4 className="title">SUPER SWEET CHAT APP</h4>
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
      </div>
    </div>
  );
}
