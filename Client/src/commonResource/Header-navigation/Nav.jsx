import React from "react";

import Logo from "../images/icons/logo-sm.png";
//import Logo from "../images/icons/logo.png";
import Search from "../images/icons/search-icon-sm.png";
import Cart from "../images/icons/cart-sm.png";
// import {Navbar, container, Nav} from "react-bootstrap"
import { Link } from "react-router-dom";
import Navbarllist from "./Navbarllist";

export default function Nav() {
  return (
    <div>
      <div className="nav-wrapper fixed-top">
        <div className="container">
          <nav className="navbar navbar-toggleable-sm navbar-expand-md">
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              ☰
            </button>
            <Link className="navbar-brand mx-auto" to="/">
              <img src={Logo} />
            </Link>

            <div className="navbar-collapse collapse">
              <ul className="navbar-nav nav-justified w-100 nav-fill">
                <Navbarllist Linkurl="/Mac/" Linkname="Mac" />
                <Navbarllist Linkurl="/Iphone/" Linkname="Iphone" />
                <Navbarllist Linkurl="/Ipad/" Linkname="Ipad" />
                <Navbarllist Linkurl="/Watch/" Linkname="Watch" />
                <Navbarllist Linkurl="/tv/" Linkname="tv" />
                <Navbarllist Linkurl="/Music/" Linkname="Music" />
                <Navbarllist Linkurl="/watch/" Linkname="watch" />
                <Navbarllist Linkurl="/Support/" Linkname="Support" />
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" href="/search/">
                    <img src={Search} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" href="/cart/">
                    <img src={Cart} />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
