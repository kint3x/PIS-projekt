import React, { useState, useEffect} from 'react';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {

  // const[userType, setUserType] = useState(localStorage.getItem("userType"));
  let userType = localStorage.getItem('userType')

  // useEffect(() => {
  //   this.forceUpdate()
  // }, [userType]);   
  
  const logout = () => {
    localStorage.clear()
  };

  let items = Array()
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
        label: 'My Profile',
        url: "/me",
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
        label: 'My Profile',
        url: "/me",
      },
      {
        label: 'Logout',
        url: "/",
        command: logout
      }
    ]
  }
  else if (userType === "owner"){
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
        label: "Products",
        url: "/products",
      },
      {
        label: "Meetings",
        url: "/meetings",
      },
      {
        label: 'My Profile',
        url: "/me",
      },
      {
        label: 'Logout',
        url: "/",
        command: logout
      }
    ]
  }

  return (
    <Menubar model={items} />
  );
}

export default Navbar;