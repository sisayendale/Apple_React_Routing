import React from "react";
import { Link } from "react-router-dom";

export default function Navbarllist({ Linkurl, Linkname }) {
  return (
    <li className="nav-item">
      <Link className="nav-link js-scroll-trigger" to={Linkurl}>
        {Linkname}
      </Link>
    </li>
  );
}
