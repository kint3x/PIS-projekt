import React from 'react'

const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>PIS project</h1>
        <div className="links">
          <a href="/worker/clients">Clients</a>
          <a href="/worker/meetings">Meetings</a>
          <a href="/">Logout</a>
        </div>
      </nav>
    );
  }
   
  export default Navbar;