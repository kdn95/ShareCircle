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
            <HomeIcon className="nav-icon" alt="home" />
            <a href="/">Home</a>
          </li>
          <li>
            <BookingsIcon className="nav-icon" alt="bookings" />
            <a href="/bookings">Bookings</a>
          </li>
          <li>
            <ChatIcon className="nav-icon" alt="chat" />
            <a href="/chat">Chat</a>
          </li>
          <li>
            <AccountIcon className="nav-icon" alt="account" />
            <button onClick={onAccountClick} className="account-button">
              Account
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
