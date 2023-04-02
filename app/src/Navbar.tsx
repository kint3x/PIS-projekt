import React from 'react'

const Navbar = ({name, userType}:any) => {

  let menu;

  if (userType === "worker"){
    menu =(
      <div className="links">
        <a href="/worker/clients">Clients</a>
        <a href="/worker/meetings">Meetings</a>
        <a href="/">Logout</a>
        <label className="logged-user-label">Logged user: </label>
        <label className="username-label">{name}</label>
      </div>
    )
  }
  else
  {
    menu =(
      <div className="links">
        <a href="/">Logout</a>
      </div>
    )
  }

  return (
    <nav className="navbar">
      <h1>PIS project</h1>
      {menu}
    </nav>
  );
}
   
export default Navbar;