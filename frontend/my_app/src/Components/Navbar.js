import React from "react"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <img src="/images/navbar/home.png" alt="home" />
            <a href="/">Home</a>
          </li>
          <li>
            <img src="/images/navbar/bookings.png" alt="bookings"/>
            <a href="/bookings">Bookings</a>
          </li>
          <li>
            <img src="/images/navbar/chat.png" alt="chat"/>
            <a href="/chat">Chat</a>
          </li>
          <li>
            <img src="/images/navbar/User.png"alt="account"/>
            <a href="/account">Account</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;