import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import BookingsIcon from '@mui/icons-material/Book';
import ChatIcon from '@mui/icons-material/Chat';
import AccountIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ onAccountClick }) => {
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
  );
};

export default Navbar;
