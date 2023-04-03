import React from 'react'

const Navbar = ({name, userType}:{name:string,userType:string}) => {

  let menu;

  if (userType === "worker"){
    menu =(
      <div className="links">
        <a href="/clients">Clients</a>
        <a href="/meetings">Meetings</a>
        <a href="/" onClick={() => localStorage.clear()}>Logout</a>
        <label className="logged-user-label">Logged user: </label>
        <label className="username-label">{name}</label>
      </div>
    )
  }
  else if (userType === "manager")
  {
    menu =(
      <div className="links">
        <a href="/" onClick={() => localStorage.clear()}>Logout</a>
      </div>
    )
  }
  else if (userType === "customers-department")
  {
    menu =(
      <div className="links">
        <a href="/" onClick={() => localStorage.clear()}>Logout</a>
      </div>
    )
  }
  else{
    menu = <div></div>
  }

  return (
    <nav className="navbar">
      <h1>PIS project</h1>
      {menu}
    </nav>
  );
}
   
export default Navbar;