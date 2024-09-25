import React from "react"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/bookings">Bookings</a>
          </li>
          <li>
            <a href="/chat">Chat</a>
          </li>
          <li>
            <a href="/account">Account</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;