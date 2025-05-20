import React from "react";

function NavbarHeader({ children }) {
  return (
    <>
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

export default NavbarHeader;