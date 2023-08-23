import { BiMenuAltRight } from "react-icons/bi";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import "./Header.css";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const getMenuStyles = (menuOpened: boolean) => {
    if (document.documentElement.clientWidth <= 800) {
      return !menuOpened ? { right: "-100%" } : {};
    }
  };

  console.log("menuOpened:", menuOpened);

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:benji@gmail.com">Contact</a>

            {/* Login */}
            <button className="button">Login</button>
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}
