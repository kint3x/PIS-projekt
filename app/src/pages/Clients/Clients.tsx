import React from 'react'
import ClientsTable from "./ClientsTable";
import useFetch from "../../utils/useFetch";
import {useHistory} from "react-router-dom";

const Clients = () => {

    const { data, isPending, error} = useFetch('http://localhost:8000/clients')

    const history = useHistory();

    const showDetail = (id:any) => {
      history.push(`/clients/${id}`);
    }

    const reassign = (id:any) => {
      console.log("reassign")
    }

    const deleteItem = (id:any) => {
      console.log("delete")
    }

    const addNewItem = () => {
      console.log("add")
    }

    const loggedUser = localStorage.getItem("userType")

    if (loggedUser === "worker")
      return (
          <div>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && <ClientsTable data={data} buttonsNum={"1"} button1name="Detail" button1OnClick={showDetail}/>}
          </div>
      );
    else if (loggedUser === "customer-department")
      return (
        <div>
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
          { data && <ClientsTable data={data} buttonsNum={"1"} button1name="Reassign" button1OnClick={reassign} addEnabled={true} addOnClick={addNewItem}/>}
        </div>
    );

    else if (loggedUser === "manager")
      return (
        <div>
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
          { data && <ClientsTable data={data} buttonsNum={"2"} button1name="Detail" button1OnClick={showDetail} button2name="Delete" button2OnClick={deleteItem} addEnabled={true} addOnClick={addNewItem}/>}
        </div>
    );
    else
      return (<div></div>)
}
   
export default Clients;