import React from 'react'
import { Menubar } from 'primereact/menubar';

const Navbar = () => {

  const userType = localStorage.getItem('userType')
  
  const logout = () => {
    localStorage.clear()
  };

  let items;
  if (userType === "worker") {

    items = [
      {
        label: "Clients",
        url: "/clients"
      },
      {
        label: "Meetings",
        url: "/meetings",
      },
      {
        label: 'Logout',
        url: "/",
        command: logout
      }
    ]

  }
  else if (userType === "manager") {
    items = [
      {
        label: "Clients",
        url: "/clients"
      },
      {
        label: "Employees",
        url: "/employees",
      },
      {
        label: 'Logout',
        url: "/",
        command: logout
      }
    ]
  }
  else {
    items = Array()
  }

  return (
    <Menubar model={items} />
  );
}

export default Navbar;