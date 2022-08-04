import React from "react";
import "./footer.css";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="footer-main">
      <div className="credits">
        <a href="https://github.com/andypieratt" target="blank">
          <AiFillGithub size={15} />
        </a>
        <a href="https://www.linkedin.com/in/andrew-pieratt/" target="blank">
          <AiFillLinkedin size={15} />
        </a>
        Andy P.
      </div>
      <div>© GoodGuysAlert Production</div>
      <div className="credits">
        <a href="https://github.com/ruxpin86" target="blank">
          <AiFillGithub size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/william-ted-glynn-71b269125"
          target="blank"
        >
          <AiFillLinkedin size={15} />
        </a>
        Ted G.
      </div>
    </div>
  );
}
