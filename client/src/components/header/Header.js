import React, { useState } from "react";
import "./header.css";
import { Cross as Hamburger } from "hamburger-react";
// import { useState } from "react";
import { Auth } from "../../utils/auth";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="header">
      <div className="logout-wrap">
        <button onClick={onSubmit} className="logout-btn">
          LOGOUT
        </button>
      </div>
      <h4 className="title">SUPER SWEET CHAT APP</h4>
      <div className="hamburger">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={20}
          color="white"
          onClick={console.log("drop-down clicked!")}
        />
      </div>
    </div>
  );
}
