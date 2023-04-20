import React from 'react'
import { Menubar } from 'primereact/menubar';

const Navbar = ({name, userType}:{name:string,userType:string}) => {

  let menu;

  let items;
  if(userType === "worker"){
    
    items = [
      { 
        label : "Clients",
        url   : "/clients"
      },
      {
        label : "Meetings",
        url   : "/meetings",
      }
    ]

  }
  else if( userType === "manager"){
    items = [
      { 
        label : "Clients",
        url   : "/clients"
      },
      {
        label : "Employees",
        url   : "/employees",
      }
    ]
  }
  else{
    items = Array()
  }

  return (
    <Menubar model={items}/>
  );
}
   
export default Navbar;